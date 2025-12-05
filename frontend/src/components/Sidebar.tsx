// src/components/Sidebar.tsx
import React from "react";

interface SidebarProps {
    tabs: string[];
    currentTab: string;
    setCurrentTab: (tab: string) => void;
    user?: {
        avatarUrl?: string;
        name?: string;
        email?: string;
    };
}

const Sidebar: React.FC<SidebarProps> = ({
    tabs,
    currentTab,
    setCurrentTab,
    user,
}) => (
    <aside className="lab-sidebar">
        {user && (
            <div className="sidebar-user">
                {user.avatarUrl && (
                    <img
                        src={user.avatarUrl}
                        alt={user.name || "Профиль"}
                        className="sidebar-avatar"
                    />
                )}
                <div className="sidebar-username">
                    {user.name || user.email || "Пользователь"}
                </div>
            </div>
        )}

        <nav className="sidebar-menu">
            <ul className="menu-list">
                {tabs.map((tab) => (
                    <li
                        key={tab}
                        className={`menu-item${tab === currentTab ? " active" : ""}`}
                        onClick={() => {
                            setCurrentTab(tab);
                            // eslint-disable-next-line no-console
                            console.log("TAB CLICKED:", tab);
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        <span>{tab}</span>
                    </li>
                ))}
            </ul>
        </nav>
    </aside>
);

export default Sidebar;
