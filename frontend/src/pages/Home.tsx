// src/pages/Home.tsx
import "../../public/styles.css";

const API_BASE = "https://api.fak1e-lab.ru";

const signInWithGoogle = () => {
    window.location.href = `${API_BASE}/auth/google/login?mode=login`;
};

const signInWithYandex = () => {
    window.location.href = `${API_BASE}/auth/yandex/login?mode=login`;
};

const Home = () => (
    <div className="main-page">
        <a className="skip-link screen-reader-text" href="#main">
            Перейти к основному содержимому
        </a>

        {/* Главная секция */}
        <section id="home" className="hero" role="banner">
            <h1 className="hero-title">Тренер по Counter-Strike</h1>
            <div className="hero-content">
                <div className="hero-text">
                    <p className="hero-description">
                        Помогаю людям реализовывать свой потенциал. Многие мои ученики
                        прошли путь от любителей до профессионалов. За последние 5 лет я
                        был наставником для таких ребят как:
                    </p>
                    <div
                        className="students-list"
                        role="list"
                        aria-label="Список учеников"
                    >
                        <div className="student-item" role="listitem">
                            <img
                                src="/images/логотип betboom.webp"
                                alt="Логотип BetBoom"
                                className="team-logo"
                                width="60"
                                height="30"
                                loading="lazy"
                            />
                            <p>BetBoom d1Ledez</p>
                        </div>
                        <div className="student-item" role="listitem">
                            <img
                                src="/images/логотип 9pandas.webp"
                                alt="Логотип 9Pandas"
                                className="team-logo"
                                width="60"
                                height="30"
                                loading="lazy"
                            />
                            <p>9Pandas r3salt</p>
                        </div>
                        <div className="student-item" role="listitem">
                            <img
                                src="/images/логотип betboom.webp"
                                alt="Логотип BetBoom"
                                className="team-logo"
                                width="60"
                                height="30"
                                loading="lazy"
                            />
                            <p>BetBoom dmrr (Аналитик)</p>
                        </div>
                        <div className="student-item" role="listitem">
                            <img
                                src="/images/логотип insilio.webp"
                                alt="Логотип Insilio"
                                className="team-logo"
                                width="60"
                                height="30"
                                loading="lazy"
                            />
                            <p>ex-Insilio dwushka</p>
                        </div>
                        <div className="student-item" role="listitem">
                            <img
                                src="/images/chimera.webp"
                                alt="Логотип Chimera"
                                className="team-logo"
                                width="60"
                                height="30"
                                loading="lazy"
                            />
                            <p>ex-Chimera VILBy</p>
                        </div>
                        <div className="student-item" role="listitem">
                            <img
                                src="/images/vpp.webp"
                                alt="Логотип VirtusPro Prodigy"
                                className="team-logo"
                                width="60"
                                height="30"
                                loading="lazy"
                            />
                            <p>VirtusPro Prodigy AquaRS</p>
                        </div>
                        <div className="student-item" role="listitem">
                            <img
                                src="/images/v1dar.webp"
                                alt="Логотип V1dar"
                                className="team-logo"
                                width="60"
                                height="30"
                                loading="lazy"
                            />
                            <p>ex-V1dar lom1k</p>
                        </div>
                        <div className="student-item" role="listitem">
                            <img
                                src="/images/sparta.webp"
                                alt="Логотип SPARTA"
                                className="team-logo"
                                width="60"
                                height="30"
                                loading="lazy"
                            />
                            <p>SPARTA Djon8</p>
                        </div>
                        <div className="student-item" role="listitem">
                            <img
                                src="/images/youngninjas.webp"
                                alt="Логотип Young Ninjas"
                                className="team-logo"
                                width="60"
                                height="30"
                                loading="lazy"
                            />
                            <p>Young Ninjas rud и многие другие</p>
                        </div>
                    </div>
                    <p className="hero-description">
                        Все вышеперечисленные игроки начинали киберспортивную карьеру в
                        моей команде.
                    </p>
                    <p className="hero-description">
                        Я помогу игpоку любого урoвня cтaть лучшe!
                    </p>
                </div>
                <div className="hero-image">
                    <img
                        src="/images/Фото тренера (главное фото).webp"
                        alt="Фото тренера Fak1E"
                        className="trainer-photo"
                        width="400"
                        height="500"
                        loading="eager"
                    />
                </div>
            </div>
        </section>

        {/* Тут можно вставить остальные секции главной, если они у тебя были (обо мне, услуги и т.д.) */}

        {/* Футер */}
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
                        <p>
                            &copy; 2025 Тренер по Counter-Strike Владислав «Fak1E» Ребец
                        </p>
                        <div className="footer-links">
                            <a href="#">Оферта на оказание образовательных услуг</a>
                            <a href="#">
                                Политика в отношении обработки персональных данных
                            </a>
                            <a href="#">Согласие на обработку персональных данных</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
);

export default Home;
