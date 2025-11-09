import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// src/components/Navbar/Navbar.tsx
import "./Navbar.css";

// ... твой компонент ...

const Navbar = ({ onAuthClick }: { onAuthClick: () => void }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleOrderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (location.pathname === "/") {
            const orderSection = document.getElementById('order');
            if (orderSection) {
                orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            navigate("/#order");
            setTimeout(() => {
                const orderSection = document.getElementById('order');
                if (orderSection) {
                    orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <div className="nav-logo">
                    <Link to="/">
                        <img
                            src="/images/Эмблема Влада в левую верхнюю часть сайта около слова Fak1e.webp"
                            alt="Fak1E Logo"
                            className="nav-logo-img"
                        />
                    </Link>
                </div>
                <div className="nav-right">
                    <ul className="nav-menu">
                        <li><Link to="/sistema-trenirovok">Система тренировок</Link></li>
                        <li><Link to="/gruppovye-trenirovki">Групповые тренировки</Link></li>
                        <li><Link to="/keisy">Кейсы</Link></li>
                        <li><a href="#order" onClick={handleOrderClick}>Заказать</a></li>
                    </ul>
                    <button className="auth-btn" onClick={onAuthClick}>Войти</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
