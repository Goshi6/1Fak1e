// src/pages/Home.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../public/styles.css";

const API_BASE = "https://api.fak1e-lab.ru";

const signInWithGoogle = () => {
    window.location.href = `${API_BASE}/auth/google/login?mode=login`;
};

const signInWithYandex = () => {
    window.location.href = `${API_BASE}/auth/yandex/login?mode=login`;
};

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${API_BASE}/auth/me`, {
                    credentials: "include", // чтобы кука ушла на бэк
                });

                if (res.ok) {
                    // юзер авторизован -> сразу в /lab
                    navigate("/lab", { replace: true });
                }
            } catch (e) {
                // если ошибка сети — просто молча показываем главную
                console.error("Auth check failed", e);
            }
        };

        checkAuth();
    }, [navigate]);

    return (
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

            {/* Обо мне */}
            <section id="about" className="about" role="main">
                <div className="container">
                    <div className="about-content">
                        <div className="about-title">
                            <h2>Обо мне</h2>
                        </div>
                        <div className="about-text">
                            <p>
                                Меня зовут Влад, но больше людей меня знает под псевдонимом
                                Фейки, и я обожаю Counter-Strike!
                            </p>
                            <p>
                                Я был капитаном и по совместительству тренером, а также скаутом
                                на протяжении 11 лет. Выигрывал всероссийские турниры, стал
                                известен в комьюнити как разбирающийся в игре человек. За
                                последние 5 лет работал в команде с более чем десятком игроков,
                                ныне играющих за профессиональные команды.
                            </p>
                            <p>
                                В последние несколько лет я работаю с учениками-любителями в
                                формате групповых и индивидуальных тренировок...
                            </p>
                            <p>
                                Я понимаю как донести информацию человеку разными способами так,
                                чтобы тот точно все понял. В последнее время мне часто говорят
                                ученики такую фразу: "Ты очень хорошо умеешь простым языком
                                объяснять сложные вещи". Наверное это потому, что я сам проходил
                                те этапы которые проходите вы и поэтому хорошо понимаю что нужно
                                сказать.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Что я могу дать */}
            <section id="benefits" className="benefits">
                <div className="container">
                    <h2>Что я могу дать тебе?</h2>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <h3>Улучшу понимание твоей игры</h3>
                            <p>
                                Сможешь больше побеждать на фейсите и увереннее играть в команде
                            </p>
                        </div>
                        <div className="benefit-card">
                            <h3>Дам практические знания</h3>
                            <p>которые ты сможешь использовать в каждом своем матче</p>
                        </div>
                        <div className="benefit-card">
                            <h3>Исправлю твои ошибки</h3>
                            <p>
                                которые сегодня мешают тебе выигрывать и становиться лучше
                            </p>
                        </div>
                        <div className="benefit-card">
                            <h3>Индивидуальный подход к твоей игре</h3>
                            <p>
                                Разберусь в твоей проблеме и научу больше влиять на исход матчей
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Мои программы */}
            <section id="training-system" className="programs">
                <div className="container">
                    <h2>Мои программы</h2>
                    <p className="programs-subtitle">Два способа поработать со мной:</p>
                    <div className="programs-grid">
                        <div className="program-card">
                            <h3>Система индивидуальных тренировок</h3>
                            <p>
                                Лучшая программа, которую использовали я и мои ученики. Задания
                                на каждый день, полезные советы, теория, эффективные упражнения!
                            </p>
                            <img
                                src="/images/Система индивидуальных тренировок.webp"
                                alt="Индивидуальные тренировки"
                                className="program-image"
                            />
                            <a href="/sistema-trenirovok" className="btn-primary">
                                Подробнее
                            </a>
                        </div>
                        <div className="program-card">
                            <h3>Fak1E Lab: Групповые тренировки</h3>
                            <p>
                                Целый месяц занятий со мной: учимся играть карту, разбираем
                                рабочие комбинации, фиксим ошибки, узнаем новое и просто
                                становимся лучше!
                            </p>
                            <img
                                src="/images/Групповые тренировки.webp"
                                alt="Групповые тренировки"
                                className="program-image"
                            />
                            <a href="/gruppovye-trenirovki" className="btn-primary">
                                Подробнее
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Отзывы */}
            <section id="testimonials" className="testimonials">
                <div className="container">
                    <h2>Обо мне говорят мои ученики:</h2>
                    <p className="testimonials-subtitle">
                        Подробнее можно почитать в разделе <a href="/keisy">Кейсы</a>
                    </p>
                    <div className="testimonials-carousel">
                        <button className="carousel-btn prev-btn">‹</button>
                        <div className="testimonials-container">
                            {Array.from({ length: 10 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="testimonial-card"
                                    data-index={idx}
                                >
                                    <img
                                        src={`/images/отзыв ${idx + 1}.png`}
                                        alt={`Отзыв ${idx + 1}`}
                                        className="testimonial-image"
                                    />
                                </div>
                            ))}
                        </div>
                        <button className="carousel-btn next-btn">›</button>
                        <div className="carousel-controls">
                            <div className="carousel-dots">
                                {Array.from({ length: 10 }).map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={`dot${idx === 0 ? " active" : ""}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Заказать */}
            <section id="order" className="order">
                <div className="container">
                    <h2>Можешь заказать прямо сейчас</h2>
                    <p className="order-subtitle">Если знаешь, что тебе нужно</p>
                    <div className="order-form">
                        <form id="orderForm" className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="nickname">Ник</label>
                                    <input type="text" id="nickname" name="nickname" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact">Контакт (Telegram)</label>
                                    <input
                                        type="text"
                                        id="contact"
                                        name="contact"
                                        placeholder="@username"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="faceit">Ссылка на свой Faceit</label>
                                    <input
                                        type="url"
                                        id="faceit"
                                        name="faceit"
                                        placeholder="https://faceit.com/..."
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="steam">Ссылка на свой Steam</label>
                                    <input
                                        type="url"
                                        id="steam"
                                        name="steam"
                                        placeholder="https://steamcommunity.com/..."
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="program">Выберите программу</label>
                                <select id="program" name="program" required>
                                    <option value="">Выберите программу</option>
                                    <option value="individual">
                                        Система индивидуальных тренировок
                                    </option>
                                    <option value="group-lite">
                                        Групповые тренировки - тариф Lite
                                    </option>
                                    <option value="group-pro">
                                        Групповые тренировки - тариф PRO
                                    </option>
                                </select>
                            </div>
                            <button type="submit" className="btn-primary btn-large">
                                Оставить заявку
                            </button>
                            <p className="order-note">
                                Оставляя заявку, вы соглашаетесь на обработку персональных
                                данных и с условиями бронирования счёта
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* YouTube */}
            <section id="youtube" className="youtube">
                <div className="container">
                    <h2>Мои видео на YouTube</h2>
                    <p className="youtube-subtitle">
                        Несколько моих роликов, в которых вы можете лучше познакомиться со
                        мной
                    </p>
                    <div className="youtube-carousel">
                        <button className="carousel-btn prev-btn">‹</button>
                        <div className="youtube-container">
                            <div className="youtube-videos-container">
                                <div className="youtube-card" data-index="0">
                                    <iframe
                                        src="https://www.youtube.com/embed/HsyMtMRWYHo"
                                        frameBorder="0"
                                        allowFullScreen
                                        className="youtube-video"
                                        title="YouTube video 1"
                                    ></iframe>
                                </div>
                                <div className="youtube-card" data-index="1">
                                    <iframe
                                        src="https://www.youtube.com/embed/9A4MymBnmd0"
                                        frameBorder="0"
                                        allowFullScreen
                                        className="youtube-video"
                                        title="YouTube video 2"
                                    ></iframe>
                                </div>
                                <div className="youtube-card" data-index="2">
                                    <iframe
                                        src="https://www.youtube.com/embed/bTQQXOJlneI"
                                        frameBorder="0"
                                        allowFullScreen
                                        className="youtube-video"
                                        title="YouTube video 3"
                                    ></iframe>
                                </div>
                                <div className="youtube-card" data-index="3">
                                    <iframe
                                        src="https://www.youtube.com/embed/sOd2E1DAlZs"
                                        frameBorder="0"
                                        allowFullScreen
                                        className="youtube-video"
                                        title="YouTube video 4"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-btn next-btn">›</button>
                        <div className="carousel-controls">
                            <div className="carousel-dots">
                                <span className="dot active"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
