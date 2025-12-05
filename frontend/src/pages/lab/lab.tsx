import React, { useState, useEffect } from "react";
import LabNavbar from "../../components/LabNavbar/LabNavbar";
import Sidebar from "../../components/Sidebar";
import UserProfile, { User as ProfileUser } from "./UserProfile";
import SettingsPage from "./SettingsPage";
import "./lab-page.css";
import "./lab-main.css";
import "./lab-content.css";
import "./lab-sidebar.css";
import "./lab-header.css";
import "./Profile.css";

type UserRole = "new" | "active" | "ex-player" | "coach";
type UserTariff = "lite" | "plus" | "pro" | null;

export interface User extends ProfileUser {
    role: UserRole;
    tariff: UserTariff;
    // при желании: можно явно описать поля для связок
    googleEmail?: string | null;
    yandexEmail?: string | null;
    yandexId?: string | null;
}

const initialUser: User = {
    id: "1222",
    name: "Гошан",
    role: "active",
    tariff: "plus",
    avatarUrl: "",
    faceitNickname: "Гошан",
};

const Lab: React.FC = () => {
    const [user, setUser] = useState<User>(initialUser);

    // Обработка результатов OAuth: только флаги привязки, профиль не трогаем
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const googleEmail = params.get("google_email");
        const googleName = params.get("google_name");
        const googleAvatar = params.get("google_avatar");

        const yandexId = params.get("yandex_id");
        const yandexEmail = params.get("yandex_email");
        const yandexName = params.get("yandex_name");

        // Если что-то прилетело от Google
        if (googleEmail || googleName || googleAvatar) {
            setUser((prev) => ({
                ...prev,
                isGoogleLinked: true,
                googleEmail: googleEmail,
                // НИЧЕГО не меняем в name/faceitNickname/avatarUrl
            }));
        }

        // Если что-то прилетело от Yandex
        if (yandexId || yandexEmail || yandexName) {
            setUser((prev) => ({
                ...prev,
                isYandexLinked: true,
                yandexEmail: yandexEmail,
                yandexId: yandexId,
            }));
        }

        // Очищаем URL от OAuth-параметров, но не трогаем другие (faceit_code и т.п.)
        if (
            googleEmail ||
            googleName ||
            googleAvatar ||
            yandexId ||
            yandexEmail ||
            yandexName
        ) {
            const copy = new URLSearchParams(params.toString());
            copy.delete("google_email");
            copy.delete("google_name");
            copy.delete("google_avatar");
            copy.delete("yandex_id");
            copy.delete("yandex_email");
            copy.delete("yandex_name");

            const newQs = copy.toString();
            const newUrl =
                window.location.pathname + (newQs ? `?${newQs}` : "");
            window.history.replaceState({}, "", newUrl);
        }
    }, []);

    if (user.role === "coach") return <CoachDashboard user={user} />;
    if (user.role === "active")
        return <ActivePlayerDashboard user={user} setUser={setUser} />;
    if (user.role === "ex-player") return <ExPlayerDashboard user={user} />;
    return <NewUserDashboard user={user} />;
};

function CoachDashboard({ user }: { user: User }) {
    return (
        <>
            <LabNavbar />
            <div className="lab-page">
                <h1>Кабинет тренера</h1>
                <p>Добро пожаловать, {user.name}!</p>
            </div>
        </>
    );
}

function ExPlayerDashboard({ user }: { user: User }) {
    return (
        <>
            <LabNavbar />
            <div className="lab-page">
                <main className="lab-main">
                    <h1>Кабинет для бывшего игрока</h1>
                    <p>Статистика, архив и предложения по возврату в сезон.</p>
                </main>
            </div>
        </>
    );
}

function NewUserDashboard({ user }: { user: User }) {
    return (
        <>
            <LabNavbar />
            <div className="lab-page">
                <main className="lab-main">
                    <h1>Добро пожаловать, {user.name}!</h1>
                    <p>Для доступа к тренировкам выбери или купи тариф:</p>
                </main>
            </div>
        </>
    );
}

interface ActivePlayerDashboardProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const TABS = [
    "Профиль",
    "Теория",
    "Пракки",
    "Домашние задания",
    "Поддержка",
    "Настройки",
];

const ActivePlayerDashboard: React.FC<ActivePlayerDashboardProps> = ({
    user,
    setUser,
}) => {
    const [currentTab, setCurrentTab] = useState("Профиль");

    const handleProfileChange: (upd: Partial<User>) => void = (upd) => {
        setUser((prev) => ({ ...prev, ...upd }));
    };

    const handleAccountLink = (service: string) => {
        setUser(
            (prev) => ({ ...prev, [`is${service}Linked`]: true } as User),
        );
    };

    const renderTabContent = () => {
        switch (currentTab) {
            case "Профиль":
                return <UserProfile user={user} />;
            case "Настройки":
                return (
                    <SettingsPage
                        user={user}
                        onChange={handleProfileChange}
                        onAccountLink={handleAccountLink}
                    />
                );
            default:
                return (
                    <div style={{ padding: 24 }}>
                        Секция «{currentTab}» — тут будет твой контент!
                    </div>
                );
        }
    };

    return (
        <>
            <LabNavbar />
            <div className="lab-page">
                <Sidebar
                    tabs={TABS}
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    user={{
                        avatarUrl: user.avatarUrl,
                        name: user.name,
                    }}
                />
                <main className="lab-main">{renderTabContent()}</main>
            </div>
        </>
    );
};

export default Lab;
