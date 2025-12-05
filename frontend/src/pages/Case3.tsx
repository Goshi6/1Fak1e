// src/pages/Case3.tsx
import "../../public/styles.css";

const Case3 = () => (
    <div>
        {/* Навигация */}

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
                    Кейс 3
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
                    Детальная информация о третьем кейсе успеха
                </p>
            </div>
        </div>

        {/* Изображение кейса */}
        <div
            style={{
                background: "#0a0a0a",
                padding: "4rem 2rem",
                textAlign: "center",
            }}
        >
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <img
                    src="/images/кейс 3.webp"
                    alt="Кейс 3"
                    style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "10px",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                    }}
                />
            </div>
        </div>
    </div>
);

export default Case3;
