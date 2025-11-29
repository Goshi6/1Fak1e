import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import "./Faceit.css";
// Замени url, если меняется туннель
const OAUTH_REDIRECTS = {
    Faceit: "https://early-bats-wave.loca.lt/auth/faceit/redirect",
    Google: "https://early-bats-wave.loca.lt/auth/google/redirect",
    Yandex: "https://early-bats-wave.loca.lt/auth/yandex/redirect",
    Steam: "https://early-bats-wave.loca.lt/auth/steam/redirect",
    Telegram: "https://early-bats-wave.loca.lt/auth/telegram/redirect",
};
const SettingsPage = ({ user, onChange, onAccountLink, }) => {
    const handleFaceitUnlink = () => {
        onChange({
            isFaceitLinked: false,
            faceitNickname: "",
            faceitId: "",
        });
    };
    const handleAccountLink = (service) => {
        const url = OAUTH_REDIRECTS[service];
        if (url) {
            window.location.href = url;
        }
        else {
            alert("Нет редиректа для сервиса: " + service);
        }
        // onAccountLink?.(service);
    };
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const nickname = params.get("nickname");
        const faceit_id = params.get("faceit_id");
        if (nickname && faceit_id) {
            onChange({
                isFaceitLinked: true,
                faceitNickname: nickname,
                faceitId: faceit_id,
                avatarUrl: params.get("avatar") || user.avatarUrl,
            });
            window.history.replaceState({}, "", window.location.pathname);
        }
    }, [onChange, user.avatarUrl]);
    const handleAvatarUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                onChange({ avatarUrl: event.target?.result });
            };
            reader.readAsDataURL(file);
        }
    };
    return (_jsxs("form", { className: "settings-form", onSubmit: (e) => e.preventDefault(), children: [_jsxs("label", { children: ["\u041D\u0438\u043A:", _jsx("input", { type: "text", value: user.name || "", disabled: !!user.faceitNickname, onChange: (e) => onChange({ name: e.target.value }) }), user.faceitNickname && (_jsx("span", { className: "info", children: "\u041D\u0438\u043A \u0431\u0435\u0440\u0435\u0442\u0441\u044F \u0441 Faceit (\u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438)" }))] }), _jsxs("label", { children: ["\u0412\u043E\u0437\u0440\u0430\u0441\u0442:", _jsx("input", { type: "number", value: user.age ?? "", onChange: (e) => onChange({
                            age: e.target.value === "" ? undefined : Number(e.target.value),
                        }) })] }), _jsxs("label", { children: ["\u041E \u0441\u0435\u0431\u0435:", _jsx("textarea", { value: user.about || "", onChange: (e) => onChange({ about: e.target.value }), maxLength: 280 })] }), _jsxs("label", { children: ["\u0410\u0432\u0430\u0442\u0430\u0440:", _jsx("input", { type: "file", accept: "image/*", onChange: handleAvatarUpload }), user.avatarUrl && (_jsx("img", { src: user.avatarUrl, alt: "\u0410\u0432\u0430\u0442\u0430\u0440\u043A\u0430", className: "profile-avatar-small" }))] }), _jsxs("div", { className: "link-block", children: [_jsx("div", { className: "faceit-link-container", children: user.isFaceitLinked ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "faceit-linked-info", children: [_jsx("span", { className: "faceit-nick-label", children: "Faceit \u043D\u0438\u043A:" }), _jsx("span", { className: "faceit-nick-value", children: user.faceitNickname })] }), _jsx("button", { type: "button", className: "unlink-btn", onClick: handleFaceitUnlink, children: "\u041E\u0442\u0432\u044F\u0437\u0430\u0442\u044C Faceit" })] })) : (_jsx("button", { type: "button", className: "link-btn", onClick: () => handleAccountLink("Faceit"), children: "\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C Faceit" })) }), _jsx("button", { type: "button", onClick: () => handleAccountLink("Google"), children: user.isGoogleLinked ? "Google привязан" : "Привязать Google" }), _jsx("button", { type: "button", onClick: () => handleAccountLink("Yandex"), children: user.isYandexLinked ? "Яндекс привязан" : "Привязать Яндекс" }), _jsx("button", { type: "button", onClick: () => handleAccountLink("Steam"), children: user.isSteamLinked ? "Steam привязан" : "Привязать Steam" }), _jsx("button", { type: "button", onClick: () => handleAccountLink("Telegram"), children: user.isTelegramLinked ? "Telegram привязан" : "Привязать Telegram" })] }), _jsx("button", { className: "save-btn", type: "submit", children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" })] }));
};
export default SettingsPage;
