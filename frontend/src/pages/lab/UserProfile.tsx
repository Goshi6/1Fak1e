import React from "react";
import "./Profile.css";
import "./Faceit.css";

// Обновленный тип User
export interface User {
    id: string;
    name: string;
    faceitNickname?: string;
    faceitId?: string; // ← Новое поле для ID Faceit
    isFaceitLinked?: boolean;
    avatarUrl?: string;
    age?: number | string;
    about?: string;
    isGoogleLinked?: boolean;
    isYandexLinked?: boolean;
    isSteamLinked?: boolean;
    isTelegramLinked?: boolean;
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

    return (
        <div className="profile-card clean-profile">
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
                                className="faceit-linked"
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

                {/* === ИКОНКА FACEIT В УГЛУ === */}
                {canShowFaceitLink && (
                    <a
                        href={faceitProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="faceit-icon-link"
                        title="Профиль на Faceit"
                    >
                        <img
                            src="/images/faceit.jpg"
                            alt="Faceit"
                            className="faceit-icon"
                        />
                    </a>
                )}
            </div>
            {/* Добавь по желанию другие social/linked info блоки тут */}
        </div>
    );
};

export default UserProfile;
