import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/App.tsx
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Cases from "./pages/Cases";
import Case1 from "./pages/Case1";
import Case2 from "./pages/Case2";
import Case3 from "./pages/Case3";
import SystemTraining from "./pages/SystemTraining";
import GroupTraining from "./pages/GroupTraining";
import Lab from "./pages/lab/lab";
import OAuthCallback from "./pages/OAuthCallback";
import AuthModal from "./components/AuthModal";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
// Фейковый PrivateRoute для защиты страниц (эмулирует: всегда залогинен)
const isLoggedIn = true;
const PrivateRoute = ({ children }) => isLoggedIn ? children : _jsx(Navigate, { to: "/" });
// Компонент-обертка для работы useLocation вне Router
function AppWithRouter() {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const location = useLocation();
    // Не показывать Navbar на всех /lab и его вложенных страницах
    const hideNavbar = location.pathname.startsWith("/lab");
    return (_jsxs(_Fragment, { children: [!hideNavbar && _jsx(Navbar, { onAuthClick: () => setShowAuthModal(true) }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/keisy", element: _jsx(Cases, {}) }), _jsx(Route, { path: "/keis-1", element: _jsx(Case1, {}) }), _jsx(Route, { path: "/keis-2", element: _jsx(Case2, {}) }), _jsx(Route, { path: "/keis-3", element: _jsx(Case3, {}) }), _jsx(Route, { path: "/sistema-trenirovok", element: _jsx(SystemTraining, {}) }), _jsx(Route, { path: "/gruppovye-trenirovki", element: _jsx(GroupTraining, {}) }), _jsx(Route, { path: "/lab/*", element: _jsx(PrivateRoute, { children: _jsx(Lab, {}) }) }), _jsx(Route, { path: "/oauth-callback", element: _jsx(OAuthCallback, {}) })] }), _jsx(AuthModal, { show: showAuthModal, onClose: () => setShowAuthModal(false) })] }));
}
function App() {
    return (_jsx(BrowserRouter, { children: _jsx(AppWithRouter, {}) }));
}
export default App;
