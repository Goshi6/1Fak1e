import React, { useEffect, ChangeEvent } from "react";
import "./Faceit.css";
import type { User } from "./UserProfile";
import { startFaceitPkceFlow } from "./pkce";

// client_id из Faceit OAuth2 (Authorization Code with PKCE)
const FACEIT_CLIENT_ID = "b3fb1fc9-a609-4aa8-84ac-871ba62db108";

// ОФИЦИАЛЬНЫЕ ОТКРЫТЫЕ URL БЭКЕНДА (для остальных сервисов)
const OAUTH_REDIRECTS: Record<string, string> = {
    Google: "https://api.fak1e-lab.ru/auth/google/login",
    Yandex: "https://api.fak1e-lab.ru/auth/yandex/login",
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
            // Старт PKCE-флоу для Faceit
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
            const verifier = window.sessionStorage.getItem("faceit_code_verifier");
            if (!verifier) {
                console.error("No faceit_code_verifier in sessionStorage");
                return;
            }

            (async () => {
                try {
                    const resp = await fetch(
                        "https://api.fak1e-lab.ru/auth/faceit/complete",
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

                    // Чистим verifier и параметр из URL
                    window.sessionStorage.removeItem("faceit_code_verifier");
                    params.delete("faceit_code");
                    const newQs = params.toString();
                    const newUrl =
                        window.location.pathname + (newQs ? `?${newQs}` : "");
                    window.history.replaceState({}, "", newUrl);
                } catch (e) {
                    console.error("Faceit complete failed", e);
                }
            })();

            return; // дальше useEffect не выполняем
        }

        // 2) Старый вариант: если вдруг приходят nickname/faceit_id прямо из URL
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
            <label>
                Ник:
                <input
                    type="text"
                    value={user.name || ""}
                    disabled={!!user.faceitNickname}
                    onChange={(e) => onChange({ name: e.target.value })}
                />
                {user.faceitNickname && (
                    <span className="info">Ник берется с Faceit (автоматически)</span>
                )}
            </label>

            <label>
                Возраст:
                <input
                    type="number"
                    value={user.age ?? ""}
                    onChange={(e) =>
                        onChange({
                            age:
                                e.target.value === "" ? undefined : Number(e.target.value),
                        })
                    }
                />
            </label>

            <label>
                О себе:
                <textarea
                    value={user.about || ""}
                    onChange={(e) => onChange({ about: e.target.value })}
                    maxLength={280}
                />
            </label>

            <label>
                Аватар:
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                />
                {user.avatarUrl && (
                    <img
                        src={user.avatarUrl}
                        alt="Аватарка"
                        className="profile-avatar-small"
                    />
                )}
            </label>

            <div className="link-block">
                <div className="faceit-link-container">
                    {user.isFaceitLinked ? (
                        <>
                            <div className="faceit-linked-info">
                                <span className="faceit-nick-label">Faceit ник:</span>
                                <span className="faceit-nick-value">
                                    {user.faceitNickname}
                                </span>
                            </div>
                            <button
                                type="button"
                                className="unlink-btn"
                                onClick={handleFaceitUnlink}
                            >
                                Отвязать Faceit
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="link-btn"
                            onClick={() => handleAccountLink("Faceit")}
                        >
                            Привязать Faceit
                        </button>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => handleAccountLink("Google")}
                >
                    {user.isGoogleLinked ? "Google привязан" : "Привязать Google"}
                </button>
                <button
                    type="button"
                    onClick={() => handleAccountLink("Yandex")}
                >
                    {user.isYandexLinked ? "Яндекс привязан" : "Привязать Яндекс"}
                </button>
                <button
                    type="button"
                    onClick={() => handleAccountLink("Steam")}
                >
                    {user.isSteamLinked ? "Steam привязан" : "Привязать Steam"}
                </button>
                <button
                    type="button"
                    onClick={() => handleAccountLink("Telegram")}
                >
                    {user.isTelegramLinked ? "Telegram привязан" : "Привязать Telegram"}
                </button>
            </div>

            <button className="save-btn" type="submit">
                Сохранить
            </button>
        </form>
    );
};

export default SettingsPage;
