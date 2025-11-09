// src/pages/Case3.tsx
import "../../public/styles.css";

const Case3 = () => (
    <div>
        {/* Навигация */}
        {/* Главная секция */}
        <div style={{
            background: "#0a0a0a",
            minHeight: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "4rem 2rem"
        }}>
            <div style={{ maxWidth: "800px" }}>
                <h1 style={{
                    color: "#ffffff",
                    fontSize: "3rem",
                    marginBottom: "2rem",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700
                }}>Кейс 3</h1>
                <p style={{
                    color: "#ffffff",
                    fontSize: "1.2rem",
                    lineHeight: 1.6,
                    margin: 0,
                    fontFamily: "Inter, sans-serif"
                }}>
                    Детальная информация о третьем кейсе успеха
                </p>
            </div>
        </div>

        {/* Изображение кейса */}
        <div style={{
            background: "#0a0a0a",
            padding: "4rem 2rem",
            textAlign: "center"
        }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <img src="/images/кейс 3.webp" alt="Кейс 3" style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "auto",
                    borderRadius: "10px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)"
                }} />
            </div>
        </div>

        {/* Футер */}
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-top">
                        <div className="footer-logo">
                            <a href="/">
                                <img src="/images/Эмблема Влада в левую верхнюю часть сайта около слова Fak1e.webp" alt="Fak1E Logo" className="footer-logo-img" />
                            </a>
                        </div>
                        <div className="footer-social">
                            <h3>Присоединяйтесь ко мне в соцсетях!</h3>
                            <div className="social-grid">
                                <a href="https://t.me/fakieof" className="social-link" target="_blank" rel="noopener">
                                    <img src="/images/telegram.png" alt="Telegram" className="social-icon" />
                                </a>
                                <a href="https://www.youtube.com/@Fak1E-" className="social-link" target="_blank" rel="noopener">
                                    <img src="/images/youtube.png" alt="YouTube" className="social-icon" />
                                </a>
                                <a href="https://www.twitch.tv/fak1eof" className="social-link" target="_blank" rel="noopener">
                                    <img src="/images/twitch.png" alt="Twitch" className="social-icon" />
                                </a>
                                <a href="https://vk.com/official_fak1e" className="social-link" target="_blank" rel="noopener">
                                    <img src="/images/vk.png" alt="VKontakte" className="social-icon" />
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
    </div>
);

export default Case3;
