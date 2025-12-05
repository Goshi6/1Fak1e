// src/pages/SystemTraining.tsx
import "../../public/styles.css";

const SystemTrainig = () => (
    <div className="sistema-trenirovok">
        {/* Навигация */}

        {/* Главная секция */}
        <section id="hero" className="hero">
            <div className="hero-background"></div>
            <div className="hero-content">
                <div className="hero-text">
                    <div className="hero-main-line">
                        <h1 className="hero-title">Система индивидуальных тренировок</h1>
                        <div className="hero-subtitle-container">
                            <p className="hero-subtitle">
                                За 3 месяца улучши свою стрельбу, движения в игре
                            </p>
                            <p className="hero-subtitle-second">
                                Научись использовать все преимущества пика
                            </p>
                        </div>
                        <p className="hero-description">
                            Рекомендована игрокам от 1200 эло
                        </p>
                    </div>
                    <div className="hero-buttons">
                        <button
                            className="btn-primary"
                        /* onClick={() =>
                          document
                            .getElementById("order")
                            ?.scrollIntoView({ behavior: "smooth", block: "start" })
                        } */
                        >
                            Заказать
                        </button>
                        <button
                            className="btn-secondary"
                        /* onClick={() => (window.location.href = "/")} */
                        >
                            На главную
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* Результаты */}
        <section id="results" className="results">
            <div className="container">
                <h2>Что ты получишь</h2>
                <div className="results-grid">
                    <div className="result-card">
                        <h3>
                            Поймешь, что индивидуальные тренировки могут действительно давать
                            прогнозируемый результат
                        </h3>
                        <p>Увидишь, как система делает тебя лучше каждый день</p>
                    </div>
                    <div className="result-card">
                        <h3>Будешь комплексно работать над своей механикой в игре</h3>
                        <p>Улучшишь контр-стрейфы, мувмент, аим, пики и прочее</p>
                    </div>
                    <div className="result-card">
                        <h3>
                            Разовьешь необходимые для Counter-Strike элементы аиминга
                        </h3>
                        <p>Научишься практически моментально доводить прицел до головы</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Что такое хороший аим */}
        <section id="aim-explanation" className="aim-explanation">
            <div className="container">
                <h2>Что на самом деле ХОРОШИЙ АИМ?</h2>
                <div className="aim-video">
                    <iframe
                        width="100%"
                        height="500"
                        src="https://www.youtube.com/embed/uHsRTjLFs-s?list=TLGGRsL-Z92CUCIwMTA4MjAyNQ"
                        title="Что такое хороший аим"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="aim-content">
                    <div className="aim-columns">
                        <div className="aim-column">
                            <p>
                                Ключевым навыком в аиминге для игрока в Counter-Strike является{" "}
                                <strong>корректировка прицела</strong>*.
                            </p>
                            <p>
                                Поэтому нашей первоочередной задачей должна быть постановка
                                уверенного уровня корректировки.
                            </p>
                            <p>
                                К сожалению, сама контра не предоставляет инструментов для
                                развития этого навыка. И если корректировка не появилась сама
                                собой, то у вас возникают проблемы с аимингом. Появляется
                                ощущение, что тренировки не помогают.
                            </p>
                        </div>
                        <div className="aim-column">
                            <p>
                                Чтобы тренировать целенаправленно тот или иной элемент аиминга,
                                существует AimLabs (и прочие аим-тренинги). Среди обычного КС
                                комьюнити они не пользуются спросом, поскольку:
                            </p>
                            <ul>
                                <li className="orange-text">
                                    либо человек смог развить в себе все необходимые навыки
                                    аиминга в игре без помощи аим-тренинга;
                                </li>
                                <li className="orange-text">
                                    либо человек не умеет его использовать.
                                </li>
                            </ul>
                            <p>
                                AimLabs играть много для нас не имеет смысла, ведь наша цель
                                все-таки в КС играть научиться, а не освоить все элементы
                                аиминга.
                            </p>
                        </div>
                    </div>
                    <div className="aim-center">
                        <p>
                            Так или иначе, огромное количество про-игроков
                            используют/использовали AimLabs в своей тренировке...
                        </p>
                        <p>
                            Форма - это про то, насколько эффективно мы можем использовать те
                            навыки, которые у нас уже есть. А тренировка - это про работу над
                            теми навыками, которые мы хотим в себе развить. Это
                            принципиальная разница. <strong>Моя система</strong> - это{" "}
                            <strong>про тренировку</strong>, а не про игровую форму.
                        </p>
                        <p className="footnote">
                            *Корректировка прицела - это быстрое микродвижение мышкой,
                            выполяемое, чтобы исправить небольшую ошибку...
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Что ты получишь */}
        <section id="benefits" className="benefits">
            <div className="container">
                <h2>Что ты получишь</h2>
                <div className="benefits-grid">
                    <div className="benefit-card">
                        <h3>Понимание системы тренировок</h3>
                        <p>
                            Изучишь принципы построения эффективных индивидуальных
                            тренировок...
                        </p>
                    </div>
                    <div className="benefit-card">
                        <h3>Целенаправленная работа над навыками</h3>
                        <p>Будешь системно развивать ключевые элементы игры...</p>
                    </div>
                    <div className="benefit-card">
                        <h3>Аим как стабильный навык</h3>
                        <p>Твоя точность станет устойчивым навыком...</p>
                    </div>
                    <div className="benefit-card">
                        <h3>Развитие ключевых преимуществ</h3>
                        <p>Сделаешь своими сильными сторонами именно те навыки...</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Цели */}
        <section id="goals" className="goals">
            <div className="container">
                <h2>Чего ты хочешь?</h2>
                <p className="section-subtitle">
                    Результаты работы по моей системе помогут тебе с любой целью!
                </p>
                <div className="goals-grid">
                    <div className="goal-card">
                        <img src="/images/Поднять эло.webp" alt="Поднять эло" />
                        <h3>Поднять эло</h3>
                    </div>
                    <div className="goal-card">
                        <img src="/images/Играть лучше.webp" alt="Играть лучше" />
                        <h3>Играть лучше</h3>
                    </div>
                    <div className="goal-card">
                        <img src="/images/Киберспорт.webp" alt="Киберспорт" />
                        <h3>Киберспорт</h3>
                    </div>
                </div>
            </div>
        </section>

        {/* Программа */}
        <section id="program" className="program">
            <div className="container">
                <h2>Программа</h2>
                <p className="section-subtitle">
                    3 месяца ты тренируешься по сформированной системе...
                </p>
                <div className="program-steps">
                    <div className="program-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3>AimLabs</h3>
                            <p>
                                Нам нужно направить наше внимание на выработку хорошей
                                корректировки прицела...
                            </p>
                        </div>
                    </div>
                    <div className="program-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3>DM</h3>
                            <p>Крайне важно тренировать нашу механику в самой игре...</p>
                        </div>
                    </div>
                    <div className="program-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3>KZ</h3>
                            <p>
                                Мувмент и умение хорошо нажимать кнопки на клавиатуре может
                                влиять на игру не меньше...
                            </p>
                        </div>
                    </div>
                    <div className="program-step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h3>Теория</h3>
                            <p>
                                Вы получите доступ к теории, в которой я подробно расскажу про
                                индивидуальные преимущества...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Стоимость */}
        <section id="pricing" className="pricing">
            <div className="container">
                <h2>Стоимость</h2>
                <div className="pricing-card">
                    <h3>Система индивидуальных тренировок</h3>
                    <div className="price">
                        <span className="current-price">990₽</span>
                        <span className="old-price">1490₽</span>
                    </div>
                    <button
                        className="btn-primary btn-large"
                    /* onClick={() =>
                      document
                        .getElementById("order")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    } */
                    >
                        Заказать
                    </button>
                </div>
            </div>
        </section>

        {/* Кейсы */}
        <section id="cases" className="testimonials">
            <div className="container">
                <h2>Мои кейсы</h2>
                <p className="testimonials-subtitle">
                    Больше отзывов в разделе <a href="/keisy">Кейсы</a>
                </p>
                <div className="testimonials-carousel">
                    <div className="testimonials-container">
                        <div className="testimonial-card" data-index="0">
                            <img
                                src="/images/кейс 1.webp"
                                alt="Кейс 1"
                                className="testimonial-image"
                            />
                        </div>
                        <div className="testimonial-card" data-index="1">
                            <img
                                src="/images/кейс 2.webp"
                                alt="Кейс 2"
                                className="testimonial-image"
                            />
                        </div>
                        <div className="testimonial-card" data-index="2">
                            <img
                                src="/images/кейс 3.webp"
                                alt="Кейс 3"
                                className="testimonial-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Модальное окно для кейсов */}
        <div id="testimonialModal" className="testimonial-modal">
            <div className="modal-content">
                <span className="close-modal">
                    {/* onClick={closeTestimonialModal} */}&times;
                </span>
                <img
                    id="modalImage"
                    src=""
                    alt="Кейс"
                    className="modal-image"
                />
            </div>
        </div>

        {/* Заказать */}
        <section id="order" className="order">
            <div className="container">
                <h2>Можешь заказать прямо сейчас</h2>
                <div className="order-form">
                    <form id="orderForm" className="contact-form">
                        <input
                            type="hidden"
                            name="service"
                            value="Система индивидуальных тренировок"
                        />
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
                        <button type="submit" className="btn-primary btn-large">
                            Оставить заявку
                        </button>
                        <p className="order-note">
                            Оставляя заявку, вы соглашаетесь на обработку персональных данных
                            и с условиями бронирования счёта
                        </p>
                    </form>
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

export default SystemTrainig;
