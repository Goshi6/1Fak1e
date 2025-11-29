import React from "react";
import "./Profile.css";
import "./Faceit.css";

// Унифицированный тип User
export interface User {
    id: string;
    name: string;
    faceitNickname?: string;
    faceitId?: string;
    isFaceitLinked?: boolean;
    avatarUrl?: string;              // только string | undefined
    age?: number;                    // только number | undefined
    about?: string;
    isGoogleLinked?: boolean;
    isYandexLinked?: boolean;
    isSteamLinked?: boolean;
    isTelegramLinked?: boolean;
    steamUrl?: string;
    telegramUrl?: string;
}

interface UserProfileProps {
    user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    const canShowFaceitLink = !!user.isFaceitLinked && !!user.faceitNickname;

    // URL на Faceit-профиль по никнейму
    const faceitProfileUrl = user.faceitNickname
        ? `https://www.faceit.com/ru/players/${user.faceitNickname}`
        : "";

    // URL для Steam и Telegram (можно формировать или брать из user)
    const steamProfileUrl = user.steamUrl || (user.isSteamLinked ? "#" : null);
    const telegramProfileUrl =
        user.telegramUrl || (user.isTelegramLinked ? "#" : null);

    return (
        <div
            className="profile-card clean-profile"
            style={{ position: "relative" }}
        >
            <div className="profile-header">
                <img
                    className="profile-avatar"
                    src={user.avatarUrl || "https://ui-avatars.com/api/?name=User"}
                    alt="Аватар"
                />
                <div className="profile-main-info">
                    <div className="profile-nickname">
                        {canShowFaceitLink ? (
                            <a
                                href={faceitProfileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Открыть профиль на Faceit"
                            >
                                {user.faceitNickname}
                            </a>
                        ) : (
                            user.faceitNickname || user.name
                        )}
                    </div>
                    <div className="profile-id">
                        ID#{user.id}
                        {user.faceitId && (
                            <span className="faceit-id">
                                {" "}
                                | Faceit ID: {user.faceitId}
                            </span>
                        )}
                    </div>
                </div>

                {/* === ИКОНКА FACEIT В УГЛУ (верхний правый) === */}
                {canShowFaceitLink && (
                    <a
                        href={faceitProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="faceit-icon-link"
                        title="Профиль на Faceit"
                    >
                        <img
                            src="/images/фейсит.jpg"
                            alt="Faceit"
                            className="faceit-icon"
                        />
                    </a>
                )}
            </div>

            {/* === ИКОНКИ СОЦСЕТЕЙ В ПРАВОМ НИЖНЕМ УГЛУ === */}
            <div className="social-accounts">
                {canShowFaceitLink && (
                    <a
                        href={faceitProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                        title="Профиль на Faceit"
                    >
                        <img src="/images/фейсит.jpg" alt="Faceit" />
                    </a>
                )}
                {user.isSteamLinked && steamProfileUrl && (
                    <a
                        href={steamProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                        title="Профиль в Steam"
                    >
                        <img src="/images/стим.png" alt="Steam" />
                    </a>
                )}
                {user.isTelegramLinked && telegramProfileUrl && (
                    <a
                        href={telegramProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                        title="Профиль в Telegram"
                    >
                        <img src="/images/тг.png" alt="Telegram" />
                    </a>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
