// src/pages/Cases.tsx
import "../../public/styles.css";

const Cases = () => (
    <div className="cases-page">
        {/* Главная секция */}
        <div
            style={{
                background: "#0a0a0a",
                minHeight: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "4rem 2rem",
                paddingTop: "120px",
            }}
        >
            <div style={{ maxWidth: "800px" }}>
                <h1
                    style={{
                        color: "#ffffff",
                        fontSize: "3rem",
                        marginBottom: "2rem",
                        textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                    }}
                >
                    Мои кейсы и отзывы
                </h1>
                <p
                    style={{
                        color: "#ffffff",
                        fontSize: "1.2rem",
                        lineHeight: 1.6,
                        margin: 0,
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    Здесь собраны несколько историй, в которых реальные ученики
                    преодолели свои проблемы и добились результатов после работы со мной.
                    Также добавил скриншоты с отзывами!
                </p>
            </div>
        </div>

        {/* Кейсы */}
        <div
            style={{
                background: "#0a0a0a",
                padding: "4rem 2rem",
                textAlign: "center",
            }}
        >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <h2
                    style={{
                        color: "#ffffff",
                        fontSize: "2.5rem",
                        marginBottom: "3rem",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                    }}
                >
                    Мои кейсы
                </h2>
                <div
                    style={{
                        display: "flex",
                        gap: "2rem",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <div style={{ flex: "0 0 300px", maxWidth: "300px" }}>
                        <a
                            href="/keis-1"
                            style={{ textDecoration: "none", display: "block" }}
                        >
                            <img
                                src="/images/кейс 1.webp"
                                alt="Кейс 1"
                                style={{
                                    width: "100%",
                                    height: "300px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                                    transition: "transform .3s ease",
                                    cursor: "pointer",
                                }}
                            />
                        </a>
                    </div>
                    <div style={{ flex: "0 0 300px", maxWidth: "300px" }}>
                        <a
                            href="/keis-2"
                            style={{ textDecoration: "none", display: "block" }}
                        >
                            <img
                                src="/images/кейс 2.webp"
                                alt="Кейс 2"
                                style={{
                                    width: "100%",
                                    height: "300px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                                    transition: "transform .3s ease",
                                    cursor: "pointer",
                                }}
                            />
                        </a>
                    </div>
                    <div style={{ flex: "0 0 300px", maxWidth: "300px" }}>
                        <a
                            href="/keis-3"
                            style={{ textDecoration: "none", display: "block" }}
                        >
                            <img
                                src="/images/кейс 3.webp"
                                alt="Кейс 3"
                                style={{
                                    width: "100%",
                                    height: "300px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                                    transition: "transform .3s ease",
                                    cursor: "pointer",
                                }}
                            />
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
    </div>
);

export default Cases;
