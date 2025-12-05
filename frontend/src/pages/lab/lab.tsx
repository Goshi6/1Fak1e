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

const API_BASE = "https://api.fak1e-lab.ru";

type UserRole = "new" | "active" | "ex-player" | "coach";
type UserTariff = "lite" | "plus" | "pro" | null;

export interface User extends ProfileUser {
    role: UserRole;
    tariff: UserTariff;
    googleEmail?: string | null;
    yandexEmail?: string | null;
    yandexId?: string | null;
}

const Lab: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sessionParam = params.get("session");

        let token =
            sessionParam || window.localStorage.getItem("session_token");

        if (sessionParam) {
            window.localStorage.setItem("session_token", sessionParam);
            params.delete("session");
            const newQs = params.toString();
            const newUrl =
                window.location.pathname + (newQs ? `?${newQs}` : "");
            window.history.replaceState({}, "", newUrl);
        }

        if (!token) {
            window.location.href = "/";
            return;
        }

        (async () => {
            try {
                const resp = await fetch(`${API_BASE}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!resp.ok) {
                    console.error("auth/me error", await resp.text());
                    window.localStorage.removeItem("session_token");
                    window.location.href = "/";
                    return;
                }
                const data = await resp.json();
                const providers: string[] = data.providers || [];
                const u: User = {
                    id: String(data.id),
                    name: data.name || "Пользователь",
                    role: "active",
                    tariff: "plus",
                    avatarUrl: data.avatar_url || "",
                    faceitNickname: data.name || "",
                    isGoogleLinked: providers.includes("google"),
                    isYandexLinked: providers.includes("yandex"),
                };
                setUser(u);
            } catch (e) {
                console.error("auth/me failed", e);
                window.location.href = "/";
            }
        })();
    }, []);

    if (!user) {
        return (
            <>
                <LabNavbar />
                <div className="lab-page">
                    <main className="lab-main">
                        <p>Загрузка...</p>
                    </main>
                </div>
            </>
        );
    }

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
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
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
        setUser((prev) => (prev ? { ...prev, ...upd } : prev));
    };

    const handleAccountLink = (service: string) => {
        setUser((prev) =>
            prev
                ? ({
                    ...prev,
                    [`is${service}Linked`]: true,
                } as unknown as User)
                : prev,
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
