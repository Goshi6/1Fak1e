import React, { useEffect, ChangeEvent } from "react";
import "./Faceit.css";
import type { User } from "./UserProfile";
import { startFaceitPkceFlow } from "./pkce";

const FACEIT_CLIENT_ID = "b3fb1fc9-a609-4aa8-84ac-871ba62db108";

const API_BASE = "https://api.fak1e-lab.ru";

// ОФИЦИАЛЬНЫЕ ОТКРЫТЫЕ URL БЭКЕНДА (для остальных сервисов)
const OAUTH_REDIRECTS: Record<string, string> = {
    Google: `${API_BASE}/auth/google/login?mode=link`,
    Yandex: `${API_BASE}/auth/yandex/login?mode=link`,
    Steam: "",
    Telegram: "",
};

type SettingsPageProps = {
    user: User;
    onChange: (upd: Partial<User>) => void;
    onAccountLink?: (service: string) => void;
};

const SettingsPage: React.FC<SettingsPageProps> = ({
    user,
    onChange,
    onAccountLink,
}) => {
    const handleFaceitUnlink = () => {
        onChange({
            isFaceitLinked: false,
            faceitNickname: "",
            faceitId: "",
        });
    };

    const handleAccountLink = (service: string) => {
        if (service === "Faceit") {
            startFaceitPkceFlow(FACEIT_CLIENT_ID);
            return;
        }

        const url = OAUTH_REDIRECTS[service];
        if (url) {
            window.location.href = url;
        } else {
            alert("Нет редиректа для сервиса: " + service);
        }
        // onAccountLink?.(service);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        // 1) PKCE-complete: забираем code из URL и verifier из sessionStorage
        const faceitCode = params.get("faceit_code");
        if (faceitCode) {
            const verifier =
                window.sessionStorage.getItem("faceit_code_verifier");
            if (!verifier) {
                console.error("No faceit_code_verifier in sessionStorage");
                return;
            }

            (async () => {
                try {
                    const resp = await fetch(
                        `${API_BASE}/auth/faceit/complete`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                code: faceitCode,
                                code_verifier: verifier,
                            }),
                        },
                    );

                    if (!resp.ok) {
                        const errText = await resp.text();
                        console.error("Faceit complete error:", errText);
                        return;
                    }

                    const data = await resp.json();
                    onChange({
                        isFaceitLinked: true,
                        faceitNickname: data.nickname,
                        faceitId: data.player_id,
                        avatarUrl: data.avatar || user.avatarUrl,
                    });

                    window.sessionStorage.removeItem("faceit_code_verifier");
                    params.delete("faceit_code");
                    const newQs = params.toString();
                    const newUrl =
                        window.location.pathname +
                        (newQs ? `?${newQs}` : "");
                    window.history.replaceState({}, "", newUrl);
                } catch (e) {
                    console.error("Faceit complete failed", e);
                }
            })();

            return;
        }

        // 2) Старый вариант: nickname/faceit_id прямо из URL
        const nickname = params.get("nickname");
        const faceit_id = params.get("faceit_id");
        if (nickname && faceit_id) {
            onChange({
                isFaceitLinked: true,
                faceitNickname: nickname,
                faceitId: faceit_id,
                avatarUrl: (params.get("avatar") as string) || user.avatarUrl,
            });
            window.history.replaceState({}, "", window.location.pathname);
        }
    }, [onChange, user.avatarUrl]);

    const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                onChange({ avatarUrl: event.target?.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
            {/* остальная форма без изменений */}
            {/* ... всё, что у тебя уже есть, включая кнопки привязки ... */}
        </form>
    );
};

export default SettingsPage;
