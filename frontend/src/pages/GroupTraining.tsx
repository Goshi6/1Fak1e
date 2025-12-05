// src/pages/GroupTraining.tsx
import "../../public/styles.css";

const GroupTraining = () => (
    <div className="group-trainings-page">
        {/* Навигация */}

        {/* Главная секция */}
        <section id="hero" className="hero">
            <div className="hero-background"></div>
            <h1 className="hero-title">
                Fak1E Lab
                <br />
                Групповые тренировки CS2
            </h1>
            <p className="hero-subtitle">
                За 4 недели улучши понимание игры и обрети навыки, которые будут
                влиять на исход твоих матчей
            </p>
            <div className="hero-content">
                <div className="hero-left-column">
                    <div className="hero-cards">
                        <div className="hero-card top-card">
                            <h3>Системный подход</h3>
                            <p>
                                Будешь заниматься по программе, состоящую из теории, практики и
                                дополнительных заданий, заточенную под рост твоего скилла.
                            </p>
                        </div>
                        <div className="hero-cards-bottom">
                            <div className="hero-card">
                                <h3>Оптимальные решения</h3>
                                <p>
                                    Научишься принимать оптимальные решения исходя из ситуации.
                                </p>
                            </div>
                            <div className="hero-card">
                                <h3>Исправление ошибок</h3>
                                <p>
                                    Поймёшь, что конкретно тебе мешает выигрывать чаще и как это
                                    исправить.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-right-column">
                    <div className="hero-right-top">
                        <div className="timer-title">
                            Стартуем 2 августа в 23:59:59
                        </div>
                        <div className="timer-display">
                            <div className="timer-unit">
                                <span className="timer-number" id="days">
                                    00
                                </span>
                                <span className="timer-label">дней</span>
                            </div>
                            <div className="timer-unit">
                                <span className="timer-number" id="hours">
                                    00
                                </span>
                                <span className="timer-label">часов</span>
                            </div>
                            <div className="timer-unit">
                                <span className="timer-number" id="minutes">
                                    00
                                </span>
                                <span className="timer-label">минут</span>
                            </div>
                            <div className="timer-unit">
                                <span className="timer-number" id="seconds">
                                    00
                                </span>
                                <span className="timer-label">секунд</span>
                            </div>
                        </div>
                        <div className="map-info">
                            <span className="map-text">Карта: Ancient</span>
                        </div>
                    </div>
                    <div className="hero-right-bottom">
                        <p className="hero-description">
                            Набор в группы доступен от 1900 эло
                        </p>
                    </div>
                </div>
            </div>

            <div className="hero-center-button">
                <button className="btn-primary btn-large">
                    {/* onClick прокрутки к order реализовать через хук */}
                    Записаться
                </button>
            </div>
        </section>

        {/* Новый раздел с текстом */}
        <section id="systematic-approach" className="systematic-approach">
            <div className="container">
                <div className="systematic-content">
                    <div className="systematic-text-column">
                        <p className="systematic-text">
                            Казалось бы, стараешься всё делать правильно, но твои результаты
                            остаются нестабильными.
                        </p>
                        <p className="systematic-text">
                            Дело не в том, что ты мало играешь. Можно месяцами отрабатывать не
                            те навыки...
                        </p>
                        <p className="systematic-text orange-text">
                            Когда ты осознанно работаешь над конкретными аспектами своей
                            игры, то прогресс перестает быть лотереей...
                        </p>
                        <p className="systematic-text white-text">
                            <span className="highlight-text">
                                Теперь такая возможность есть и у тебя!
                            </span>
                        </p>
                    </div>
                    <div className="systematic-image-column">
                        <div className="fifa-card">
                            <div className="fifa-card-background">
                                <div className="fifa-card-gradient"></div>
                                <div className="fifa-card-pattern"></div>
                            </div>
                            <div className="fifa-card-content">
                                <div className="fifa-card-header">
                                    <div className="fifa-card-name">Fak1E</div>
                                    <div className="fifa-card-position">Тренер</div>
                                    <div className="fifa-card-rating">95</div>
                                </div>
                                <div className="fifa-card-photo">
                                    <img
                                        src="/images/Фото тренера (главное фото).webp"
                                        alt="Fak1E"
                                        className="fifa-trainer-photo"
                                    />
                                </div>
                                <div className="fifa-card-stats">
                                    <div className="fifa-stat">
                                        <span className="stat-label">Опыт</span>
                                        <span className="stat-value">11 лет</span>
                                    </div>
                                    <div className="fifa-stat">
                                        <span className="stat-label">Ученики</span>
                                        <span className="stat-value">500+</span>
                                    </div>
                                    <div className="fifa-stat">
                                        <span className="stat-label">Победы</span>
                                        <span className="stat-value">$11K</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Тарифы */}
        <section id="tariffs" className="tariffs">
            <div className="container">
                <h2>Тарифы</h2>
                <div className="tariffs-grid">
                    <div className="tariff-card lite">
                        <div className="tariff-header">
                            <h3>Lite</h3>
                            <div className="tariff-limit">Всего мест: 12</div>
                        </div>
                        <div className="tariff-price">
                            <span className="price">4500₽</span>
                        </div>
                        <div className="tariff-features">
                            <ul>
                                <li>4+ часа теории</li>
                                <li>До 8 часов разборов</li>
                                <li>16 пракков</li>
                                <li>4 домашних задания</li>
                                <li>3 гайда</li>
                                <li>Доступ к чату с другими участниками</li>
                                <li>Прямой контакт со мной</li>
                            </ul>
                        </div>
                        <button className="btn-primary">
                            {/* onClick={() => selectTariffAndScroll('group-lite')} */}
                            Записаться
                        </button>
                    </div>
                    <div className="tariff-card featured">
                        <div className="tariff-header">
                            <h3>PRO</h3>
                            <div className="tariff-limit">Всего мест: 28</div>
                        </div>
                        <div className="tariff-price">
                            <span className="price">7000₽</span>
                        </div>
                        <div className="tariff-features">
                            <ul>
                                <li>4+ часа теории</li>
                                <li>До 8 часов разборов</li>
                                <li>16 пракков</li>
                                <li>4 домашних задания</li>
                                <li>3 гайда</li>
                                <li>Доступ к чату с другими участниками</li>
                                <li>Прямой контакт со мной</li>
                                <li>4 индивидуальных разбора твоих пракков</li>
                                <li>Личные рекомендации от меня по улучшению игры</li>
                                <li>Разработка индивидуального плана развития</li>
                                <li>
                                    3 дополнительных гайда: индивидуалка, pathing, численное
                                    преимущество
                                </li>
                            </ul>
                        </div>
                        <button className="btn-primary">
                            {/* onClick={() => selectTariffAndScroll('group-pro')} */}
                            Записаться
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* Программа */}
        <section id="included" className="included">
            <div className="container">
                <h2>Программа</h2>
                <p className="program-description">
                    8 групповых тренировок за 4 недели - ты тренируешься в сформированной
                    команде, отрабатывая ключевые навыки, нужные для твоей позиции на
                    разбираемой карте
                </p>
                <div className="program-steps">
                    <div className="program-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3>Теория</h3>
                            <p>
                                В начале каждой недели — теория. На ней дается вся необходимая
                                база для игры в CS на высоком уровне...
                            </p>
                        </div>
                    </div>
                    <div className="program-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3>Практика</h3>
                            <p>16 пракков и до 8 часов разборов в месяц...</p>
                        </div>
                    </div>
                    <div className="program-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3>Домашние задания</h3>
                            <p>
                                Каждую неделю ты будешь получать домашнее задание, направленное
                                на получение новых знаний...
                            </p>
                        </div>
                    </div>
                    <div className="program-step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h3>Ошибки</h3>
                            <p>
                                Ошибки, которые мы не успели обсудить на разборе, загружаются в
                                общий доступ...
                            </p>
                        </div>
                    </div>
                    <div className="program-step">
                        <div className="step-number">5</div>
                        <div className="step-content">
                            <h3>Индивидуальный разбор демок</h3>
                            <p>
                                В тарифе PRO каждую неделю тебя ждет персональный разбор со
                                мной...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Заказать */}
        <section id="order" className="order">
            <div className="container">
                <h2>Готов начать тренировки?</h2>
                <p className="order-subtitle">
                    Выберите подходящий тариф и присоединяйтесь к группе
                </p>
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
                            <label htmlFor="program">Выберите тариф</label>
                            <select id="program" name="program" required>
                                <option value="">Выберите тариф</option>
                                <option value="group-lite">
                                    Групповые тренировки - тариф Lite (4500₽)
                                </option>
                                <option value="group-pro">
                                    Групповые тренировки - тариф PRO (7000₽)
                                </option>
                            </select>
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
    </div>
);

export default GroupTraining;
