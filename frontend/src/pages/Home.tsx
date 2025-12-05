// src/pages/Home.tsx
import "../../public/styles.css"; // если стили лежат в public!

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

        {/* Навигация */}
        {/* Главная секция */}
        <section id="home" className="hero" role="banner">
            <h1 className="hero-title">Тренер по Counter-Strike</h1>
            <div className="hero-content">
                <div className="hero-text">
                    <p className="hero-description">
                        Помогаю людям реализовывать свой потенциал. Многие мои
                        ученики прошли путь от любителей до профессионалов. За
                        последние 5 лет я был наставником для таких ребят как:
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
                        Все вышеперечисленные игроки начинали
                        киберспортивную карьеру в моей команде.
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

        {/* Обо мне */}
        {/* ... остальной контент без изменений ... */}

        {/* Футер */}
        <footer className="footer">
            {/* ... как у тебя сейчас ... */}
        </footer>

        {/* Модальное окно авторизации */}
        <div id="authModal" className="auth-modal">
            <div className="auth-modal-content">
                <span className="auth-close">
                    &times;
                </span>
                <h2 className="auth-title">Войти в аккаунт</h2>
                <p className="auth-subtitle">
                    Выберите способ входа через социальные сети
                </p>
                <div className="auth-buttons">
                    <button
                        className="auth-btn-google"
                        onClick={signInWithGoogle}
                    >
                        Войти через Google
                    </button>
                    <button
                        className="auth-btn-yandex"
                        onClick={signInWithYandex}
                    >
                        Войти через Яндекс
                    </button>
                </div>
                <div className="auth-info">
                    <p>
                        Для входа используйте ваш Google или Яндекс аккаунт
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default Home;
