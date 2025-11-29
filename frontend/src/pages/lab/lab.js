import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import LabNavbar from "../../components/LabNavbar/LabNavbar";
import Sidebar from "../../components/Sidebar";
import UserProfile from "./UserProfile";
import SettingsPage from "./SettingsPage";
import "./lab-page.css";
import "./lab-main.css";
import "./lab-content.css";
import "./lab-sidebar.css";
import "./lab-header.css";
import "./Profile.css";
const initialUser = {
    id: "1222",
    name: "Гошан",
    role: "active",
    tariff: "plus",
    avatarUrl: "",
    faceitNickname: "Гошан",
};
const Lab = () => {
    const [user, setUser] = useState(initialUser);
    if (user.role === "coach")
        return _jsx(CoachDashboard, { user: user });
    if (user.role === "active")
        return _jsx(ActivePlayerDashboard, { user: user, setUser: setUser });
    if (user.role === "ex-player")
        return _jsx(ExPlayerDashboard, { user: user });
    return _jsx(NewUserDashboard, { user: user });
};
function CoachDashboard({ user }) {
    return (_jsxs(_Fragment, { children: [_jsx(LabNavbar, {}), _jsxs("div", { className: "lab-page", children: [_jsx("h1", { children: "\u041A\u0430\u0431\u0438\u043D\u0435\u0442 \u0442\u0440\u0435\u043D\u0435\u0440\u0430" }), _jsxs("p", { children: ["\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C, ", user.name, "!"] })] })] }));
}
function ExPlayerDashboard({ user }) {
    return (_jsxs(_Fragment, { children: [_jsx(LabNavbar, {}), _jsx("div", { className: "lab-page", children: _jsxs("main", { className: "lab-main", children: [_jsx("h1", { children: "\u041A\u0430\u0431\u0438\u043D\u0435\u0442 \u0434\u043B\u044F \u0431\u044B\u0432\u0448\u0435\u0433\u043E \u0438\u0433\u0440\u043E\u043A\u0430" }), _jsx("p", { children: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430, \u0430\u0440\u0445\u0438\u0432 \u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043F\u043E \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0443 \u0432 \u0441\u0435\u0437\u043E\u043D." })] }) })] }));
}
function NewUserDashboard({ user }) {
    return (_jsxs(_Fragment, { children: [_jsx(LabNavbar, {}), _jsx("div", { className: "lab-page", children: _jsxs("main", { className: "lab-main", children: [_jsxs("h1", { children: ["\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C, ", user.name, "!"] }), _jsx("p", { children: "\u0414\u043B\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0430\u043C \u0432\u044B\u0431\u0435\u0440\u0438 \u0438\u043B\u0438 \u043A\u0443\u043F\u0438 \u0442\u0430\u0440\u0438\u0444:" })] }) })] }));
}
const TABS = [
    "Профиль",
    "Теория",
    "Пракки",
    "Домашние задания",
    "Поддержка",
    "Настройки",
];
const ActivePlayerDashboard = ({ user, setUser, }) => {
    const [currentTab, setCurrentTab] = useState("Профиль");
    const handleProfileChange = (upd) => {
        setUser((prev) => ({ ...prev, ...upd }));
    };
    const handleAccountLink = (service) => {
        setUser((prev) => ({ ...prev, [`is${service}Linked`]: true }));
    };
    const renderTabContent = () => {
        switch (currentTab) {
            case "Профиль":
                return _jsx(UserProfile, { user: user });
            case "Настройки":
                return (_jsx(SettingsPage, { user: user, onChange: handleProfileChange, onAccountLink: handleAccountLink }));
            default:
                return (_jsxs("div", { style: { padding: 24 }, children: ["\u0421\u0435\u043A\u0446\u0438\u044F \u00AB", currentTab, "\u00BB \u2014 \u0442\u0443\u0442 \u0431\u0443\u0434\u0435\u0442 \u0442\u0432\u043E\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442!"] }));
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(LabNavbar, {}), _jsxs("div", { className: "lab-page", children: [_jsx(Sidebar, { tabs: TABS, currentTab: currentTab, setCurrentTab: setCurrentTab, user: {
                            avatarUrl: user.avatarUrl,
                            name: user.name,
                        } }), _jsx("main", { className: "lab-main", children: renderTabContent() })] })] }));
};
export default Lab;
