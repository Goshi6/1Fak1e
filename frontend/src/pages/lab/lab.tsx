import React, { useState } from "react";
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

// Типы для пользователя
type UserRole = "new" | "active" | "ex-player" | "coach";
type UserTariff = "lite" | "plus" | "pro" | null;

// Берём базовый User из UserProfile и расширяем под лабу
export interface User extends ProfileUser {
    role: UserRole;
    tariff: UserTariff;
}

// Мок-юзер (начальное значение!)
const initialUser: User = {
    id: "1222",
    name: "Гошан",
    role: "active",
    tariff: "plus",
    avatarUrl: "",
    faceitNickname: "Гошан",
};

// --- ВСЕ user и setUser только в Lab ---
const Lab: React.FC = () => {
    const [user, setUser] = useState<User>(initialUser);

    if (user.role === "coach") return <CoachDashboard user={user} />;
    if (user.role === "active")
        return <ActivePlayerDashboard user={user} setUser={setUser} />;
    if (user.role === "ex-player") return <ExPlayerDashboard user={user} />;
    return <NewUserDashboard user={user} />;
};

// Остальные дашборды (без изменений)
function CoachDashboard({ user }: { user: User }) {
    return (
        <>
            <LabNavbar />
            <div className="lab-page">
                <h1>Кабинет тренера</h1>
                <p>Добро пожаловать, {user.name}!</p>
                {/* Функционал тренера */}
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

// === DASHBOARD ДЛЯ ACTIVE PLAYER (никаких тест-инпутов) ===
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

    const handleProfileChange = (changes: Partial<User>) => {
        setUser((prev) => ({ ...prev, ...changes }));
    };

    const handleAccountLink = (service: string) => {
        setUser((prev) => ({ ...prev, [`is${service}Linked`]: true } as User));
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
