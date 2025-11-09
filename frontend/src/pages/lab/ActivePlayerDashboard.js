import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import LabNavbar from "../../components/LabNavbar/LabNavbar";
import Sidebar from "../../components/Sidebar";
import "./lab-sidebar.css";
import UserProfile from "./UserProfile";
import SettingsPage from "./SettingsPage";
const TABS = [
    "Профиль",
    "Теория",
    "Пракки",
    "Домашние задания",
    "Поддержка",
    "Настройки"
];
const ActivePlayerDashboard = ({ user: initialUser }) => {
    const [currentTab, setCurrentTab] = useState("Профиль");
    const [user, setUser] = useState(initialUser);
    const handleProfileChange = (changes) => {
        setUser(prev => ({ ...prev, ...changes }));
    };
    const handleAccountLink = (service) => {
        setUser(prev => ({ ...prev, [`is${service}Linked`]: true }));
    };
    const renderTabContent = () => {
        switch (currentTab) {
            case "Профиль":
                return _jsx(UserProfile, { user: user });
            case "Настройки":
                return (_jsx(SettingsPage, { user: user, onChange: handleProfileChange, onAccountLink: handleAccountLink }));
            default:
                return _jsxs("div", { style: { padding: 24 }, children: ["\u0421\u0435\u043A\u0446\u0438\u044F \u00AB", currentTab, "\u00BB \u2014 \u0442\u0443\u0442 \u0431\u0443\u0434\u0435\u0442 \u0442\u0432\u043E\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442!"] });
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(LabNavbar, {}), _jsxs("div", { className: "lab-page", children: [_jsx(Sidebar, { tabs: TABS, currentTab: currentTab, setCurrentTab: setCurrentTab }), _jsx("main", { className: "lab-main", children: renderTabContent() })] })] }));
};
export default ActivePlayerDashboard;
