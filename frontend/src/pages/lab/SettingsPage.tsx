import React, { useEffect, ChangeEvent } from "react";
import "./Faceit.css";

// Замени url, если меняется туннель
const OAUTH_REDIRECTS: Record<string, string> = {
    Faceit: "https://early-bats-wave.loca.lt/auth/faceit/redirect",
    Google: "https://early-bats-wave.loca.lt/auth/google/redirect",
    Yandex: "https://early-bats-wave.loca.lt/auth/yandex/redirect",
    Steam: "https://early-bats-wave.loca.lt/auth/steam/redirect",
    Telegram: "https://early-bats-wave.loca.lt/auth/telegram/redirect",
};

type User = {
    name?: string;
    age?: number;
    about?: string;
    avatarUrl?: string | null;

    // Faceit
    isFaceitLinked?: boolean;
    faceitNickname?: string;
    faceitId?: string;

    // Остальные сервисы
    isGoogleLinked?: boolean;
    isYandexLinked?: boolean;
    isSteamLinked?: boolean;
    isTelegramLinked?: boolean;
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
        const url = OAUTH_REDIRECTS[service];
        if (url) {
            window.location.href = url;
        } else {
            alert("Нет редиректа для сервиса: " + service);
        }
        // Или: onAccountLink?.(service);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const nickname = params.get("nickname");
        const faceit_id = params.get("faceit_id");
        if (nickname && faceit_id) {
            onChange({
                isFaceitLinked: true,
                faceitNickname: nickname,
                faceitId: faceit_id,
                avatarUrl: params.get("avatar") || user.avatarUrl,
            });
            window.history.replaceState({}, "", window.location.pathname);
        }
        // Аналогично можешь обработать callback других сервисов
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
            {/* Имя (ник) */}
            <label>
                Ник:
                <input
                    type="text"
                    value={user.name || ""}
                    disabled={!!user.faceitNickname}
                    onChange={(e) => onChange({ name: e.target.value })}
                />
                {user.faceitNickname && (
                    <span className="info">
                        Ник берется с Faceit (автоматически)
                    </span>
                )}
            </label>

            {/* Возраст */}
            <label>
                Возраст:
                <input
                    type="number"
                    value={user.age || ""}
                    onChange={(e) => onChange({ age: Number(e.target.value) })}
                />
            </label>

            {/* О себе */}
            <label>
                О себе:
                <textarea
                    value={user.about || ""}
                    onChange={(e) => onChange({ about: e.target.value })}
                    maxLength={280}
                />
            </label>

            {/* Аватар */}
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

            {/* Связанные аккаунты */}
            <div className="link-block">
                {/* FACEIT */}
                <div className="faceit-link-container">
                    {user.isFaceitLinked ? (
                        <>
                            <div className="faceit-linked-info">
                                <span className="faceit-nick-label">Faceit ник:</span>
                                <span className="faceit-nick-value">{user.faceitNickname}</span>
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
