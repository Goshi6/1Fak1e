// src/components/Footer.tsx
import "../../public/styles.css";

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <div className="footer-top">
                    <div className="footer-logo">
                        <a href="/">
                            <img
                                src="/images/Эмблема Влада в левую верхнюю часть сайта около слова Fak1e.webp"
                                alt="Fak1E Logo"
                                className="footer-logo-img"
                            />
                        </a>
                    </div>
                    <div className="footer-social">
                        <h3>Присоединяйтесь ко мне в соцсетях!</h3>
                        <div className="social-grid">
                            <a
                                href="https://t.me/fakieof"
                                className="social-link"
                                target="_blank"
                                rel="noopener"
                            >
                                <img
                                    src="/images/telegram.png"
                                    alt="Telegram"
                                    className="social-icon"
                                />
                            </a>
                            <a
                                href="https://www.youtube.com/@Fak1E-"
                                className="social-link"
                                target="_blank"
                                rel="noopener"
                            >
                                <img
                                    src="/images/youtube.png"
                                    alt="YouTube"
                                    className="social-icon"
                                />
                            </a>
                            <a
                                href="https://www.twitch.tv/fak1eof"
                                className="social-link"
                                target="_blank"
                                rel="noopener"
                            >
                                <img
                                    src="/images/twitch.png"
                                    alt="Twitch"
                                    className="social-icon"
                                />
                            </a>
                            <a
                                href="https://vk.com/official_fak1e"
                                className="social-link"
                                target="_blank"
                                rel="noopener"
                            >
                                <img
                                    src="/images/vk.png"
                                    alt="VKontakte"
                                    className="social-icon"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 Тренер по Counter-Strike Владислав «Fak1E» Ребец</p>
                    <div className="footer-links">
                        <a href="#">Оферта на оказание образовательных услуг</a>
                        <a href="#">Политика в отношении обработки персональных данных</a>
                        <a href="#">Согласие на обработку персональных данных</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
