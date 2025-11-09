// src/pages/OAuthCallback.tsx
import React, { useEffect } from "react";
const OAuthCallback = () => {
    useEffect(() => {
        // Получаем параметры из URL
        const urlParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));

        let accessToken = urlParams.get("access_token") || hashParams.get("access_token");
        let state = urlParams.get("state") || hashParams.get("state");
        let error = urlParams.get("error") || hashParams.get("error");
        let errorDescription = urlParams.get("error_description") || hashParams.get("error_description");

        if (error) {
            alert(`Ошибка авторизации: ${errorDescription || error}`);
            window.close();
            return;
        }

        if (accessToken) {
            // Google OAuth
            if (accessToken.startsWith("ya29.")) {
                processGoogleAuth(accessToken);
            } else {
                // Яндекс OAuth
                processYandexAuth(accessToken);
            }
        } else {
            alert("Ошибка: токен доступа не найден");
            window.close();
        }

        function processGoogleAuth(accessToken: string) {
            fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`)
                .then((response) => response.json())
                .then((userData) => {
                    // Автоматически сохраняем данные (можешь заменить на свой стейт/контекст/запрос)
                    localStorage.setItem("authToken", "google_token_" + Date.now());
                    localStorage.setItem("userEmail", userData.email);
                    localStorage.setItem("userName", userData.name || userData.given_name || userData.email.split("@")[0]);
                    localStorage.setItem("userPicture", userData.picture);

                    if (window.opener) window.opener.location.reload();
                    window.close();
                })
                .catch(() => {
                    alert("Ошибка получения данных пользователя Google");
                    window.close();
                });
        }

        function processYandexAuth(accessToken: string) {
            fetch(`https://login.yandex.ru/info?oauth_token=${accessToken}`)
                .then((response) => response.json())
                .then((userData) => {
                    localStorage.setItem("authToken", "yandex_token_" + Date.now());
                    localStorage.setItem("userEmail", userData.default_email);
                    localStorage.setItem("userName", userData.real_name || userData.display_name || userData.first_name || userData.default_email?.split("@")[0]);
                    localStorage.setItem("userPicture", userData.avatar_url);

                    if (window.opener) window.opener.location.reload();
                    window.close();
                })
                .catch(() => {
                    alert("Ошибка получения данных пользователя Яндекс");
                    window.close();
                });
        }
    }, []);

    return (
        <div style={{
            fontFamily: "Arial, sans-serif",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            background: "#f5f5f5"
        }}>
            <div className="callback-container" style={{
                textAlign: "center",
                background: "white",
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}>
                <div className="spinner" style={{
                    border: "4px solid #f3f3f3",
                    borderTop: "4px solid #007bff",
                    borderRadius: "50%",
                    width: 40, height: 40,
                    animation: "spin 1s linear infinite",
                    margin: "0 auto 1rem"
                }} />
                <p>Обработка авторизации...</p>
                <style>
                    {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
                </style>
            </div>
        </div>
    );
};

export default OAuthCallback;
