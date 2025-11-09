import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate, useLocation } from "react-router-dom";
// src/components/Navbar/Navbar.tsx
import "./Navbar.css";
// ... твой компонент ...
const Navbar = ({ onAuthClick }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleOrderClick = (e) => {
        e.preventDefault();
        if (location.pathname === "/") {
            const orderSection = document.getElementById('order');
            if (orderSection) {
                orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        else {
            navigate("/#order");
            setTimeout(() => {
                const orderSection = document.getElementById('order');
                if (orderSection) {
                    orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    };
    return (_jsx("nav", { className: "navbar", children: _jsxs("div", { className: "navbar-inner", children: [_jsx("div", { className: "nav-logo", children: _jsx(Link, { to: "/", children: _jsx("img", { src: "/images/\u042D\u043C\u0431\u043B\u0435\u043C\u0430 \u0412\u043B\u0430\u0434\u0430 \u0432 \u043B\u0435\u0432\u0443\u044E \u0432\u0435\u0440\u0445\u043D\u044E\u044E \u0447\u0430\u0441\u0442\u044C \u0441\u0430\u0439\u0442\u0430 \u043E\u043A\u043E\u043B\u043E \u0441\u043B\u043E\u0432\u0430 Fak1e.webp", alt: "Fak1E Logo", className: "nav-logo-img" }) }) }), _jsxs("div", { className: "nav-right", children: [_jsxs("ul", { className: "nav-menu", children: [_jsx("li", { children: _jsx(Link, { to: "/sistema-trenirovok", children: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043E\u043A" }) }), _jsx("li", { children: _jsx(Link, { to: "/gruppovye-trenirovki", children: "\u0413\u0440\u0443\u043F\u043F\u043E\u0432\u044B\u0435 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0438" }) }), _jsx("li", { children: _jsx(Link, { to: "/keisy", children: "\u041A\u0435\u0439\u0441\u044B" }) }), _jsx("li", { children: _jsx("a", { href: "#order", onClick: handleOrderClick, children: "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C" }) })] }), _jsx("button", { className: "auth-btn", onClick: onAuthClick, children: "\u0412\u043E\u0439\u0442\u0438" })] })] }) }));
};
export default Navbar;
