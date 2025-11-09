import { jsx as _jsx } from "react/jsx-runtime";
const Sidebar = ({ tabs, currentTab, setCurrentTab, user }) => (_jsx("aside", { className: "lab-sidebar", children: _jsx("nav", { className: "sidebar-menu", children: _jsx("ul", { className: "menu-list", children: tabs.map(tab => (_jsx("li", { className: `menu-item${tab === currentTab ? " active" : ""}`, onClick: () => {
                    setCurrentTab(tab);
                    // ДЛЯ ОТЛАДКИ!
                    // eslint-disable-next-line no-console
                    console.log("TAB CLICKED:", tab);
                }, style: { cursor: "pointer" }, children: _jsx("span", { children: tab }) }, tab))) }) }) }));
export default Sidebar;
