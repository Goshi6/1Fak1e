import React, { useState } from "react";
import LabNavbar from "../../components/LabNavbar/LabNavbar";
import Sidebar from "../../components/Sidebar";
import "./lab-sidebar.css";
import type { User } from "./UserProfile";
import UserProfile from "./UserProfile";
import SettingsPage from "./SettingsPage";

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

export default ActivePlayerDashboard;
