// src/pages/lab/LabNavbar.tsx
import "./LabNavbar.css"

const LabNavbar = () => (
    <nav className="lab-navbar">
        <div className="lab-navbar-inner">
            <a href="/" className="lab-navbar-logo" aria-label="Вернуться на главную">
                <img
                    src="/images/Эмблема Влада в левую верхнюю часть сайта около слова Fak1e.webp"
                    alt="Fak1E Logo"
                    className="lab-navbar-img"
                />
            </a>
            {/* Здесь можно добавить пункт Logout/аватар позже */}
        </div>
    </nav>
);

export default LabNavbar;
