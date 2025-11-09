// src/pages/Cases.tsx
import "../../public/styles.css"; // если глобальный css

const Cases = () => (
    <div className="cases-page">
        {/* Навигация */}
        {/* Главная секция */}
        <div style={{
            background: "#0a0a0a",
            minHeight: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "4rem 2rem",
            paddingTop: "120px" // ДОБАВИТЬ ЭТУ СТРОКУ - учитывает фиксированный навбар
        }}>
            <div style={{ maxWidth: "800px" }}>
                <h1 style={{
                    color: "#ffffff",
                    fontSize: "3rem",
                    marginBottom: "2rem",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700
                }}>Мои кейсы и отзывы</h1>
                <p style={{
                    color: "#ffffff",
                    fontSize: "1.2rem",
                    lineHeight: 1.6,
                    margin: 0,
                    fontFamily: "Inter, sans-serif"
                }}>
                    Здесь собраны несколько историй, в которых реальные ученики преодолели свои проблемы и добились результатов после работы со мной. Также добавил скриншоты с отзывами!
                </p>
            </div>
        </div>

        {/* Кейсы */}
        <div style={{
            background: "#0a0a0a",
            padding: "4rem 2rem",
            textAlign: "center"
        }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <h2 style={{
                    color: "#ffffff",
                    fontSize: "2.5rem",
                    marginBottom: "3rem",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700
                }}>Мои кейсы</h2>
                <div style={{
                    display: "flex",
                    gap: "2rem",
                    justifyContent: "center",
                    flexWrap: "wrap"
                }}>
                    <div style={{ flex: "0 0 300px", maxWidth: "300px" }}>
                        <a href="/keis-1" style={{ textDecoration: "none", display: "block" }}>
                            <img src="/images/кейс 1.webp" alt="Кейс 1" style={{
                                width: "100%",
                                height: "300px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                boxShadow: "0 5px 15px rgba(0,0,0,.3)",
                                transition: "transform .3s ease",
                                cursor: "pointer"
                            }} />
                        </a>
                    </div>
                    <div style={{ flex: "0 0 300px", maxWidth: "300px" }}>
                        <a href="/keis-2" style={{ textDecoration: "none", display: "block" }}>
                            <img src="/images/кейс 2.webp" alt="Кейс 2" style={{
                                width: "100%",
                                height: "300px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                boxShadow: "0 5px 15px rgba(0,0,0,.3)",
                                transition: "transform .3s ease",
                                cursor: "pointer"
                            }} />
                        </a>
                    </div>
                    <div style={{ flex: "0 0 300px", maxWidth: "300px" }}>
                        <a href="/keis-3" style={{ textDecoration: "none", display: "block" }}>
                            <img src="/images/кейс 3.webp" alt="Кейс 3" style={{
                                width: "100%",
                                height: "300px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                boxShadow: "0 5px 15px rgba(0,0,0,.3)",
                                transition: "transform .3s ease",
                                cursor: "pointer"
                            }} />
                        </a>
                    </div>
                </div>
            </div>
        </div>

        {/* Отзывы */}
        <section id="testimonials" className="testimonials">
            <div className="container">
                <h2>Обо мне говорят мои ученики:</h2>
                <div className="testimonials-carousel">
                    <button className="carousel-btn prev-btn">{/* onClick={prevTestimonial} */}‹</button>
                    <div className="testimonials-container">
                        {/* Отзыв-карточки */}
                        {Array.from({ length: 10 }).map((_, idx) => (
                            <div key={idx} className="testimonial-card" data-index={idx}>
                                <img
                                    src={`/images/отзыв ${idx + 1}.png`}
                                    alt={`Отзыв ${idx + 1}`}
                                    className="testimonial-image"
                                // onClick={() => openTestimonialModal(`/images/отзыв ${idx + 1}.png`)}
                                />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-btn next-btn">{/* onClick={nextTestimonial} */}›</button>
                    <div className="carousel-controls">
                        <div className="carousel-dots">
                            {Array.from({ length: 10 }).map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`dot${idx === 0 ? " active" : ""}`}
                                // onClick={() => goToTestimonial(idx)}
                                ></span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

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

        {/* Модальное окно авторизации */}
        <div id="authModal" className="auth-modal">
            <div className="auth-modal-content">
                <span className="auth-close">{/* onClick={closeAuthModal} */}&times;</span>
                <h2 className="auth-title">Войти в аккаунт</h2>
                <p className="auth-subtitle">Выберите способ входа через социальные сети</p>
                <div className="auth-buttons">
                    <button className="auth-btn-google">{/* onClick={signInWithGoogle} */}
                        {/* SVG ... */}
                        Войти через Google
                    </button>
                    <button className="auth-btn-yandex">{/* onClick={signInWithYandex} */}
                        {/* SVG ... */}
                        Войти через Яндекс
                    </button>
                </div>
                <div className="auth-info">
                    <p>Для входа используйте ваш Google или Яндекс аккаунт</p>
                </div>
            </div>
        </div>
    </div>
);

export default Cases;
