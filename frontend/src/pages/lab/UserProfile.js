import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Profile.css";
import "./Faceit.css";
const UserProfile = ({ user }) => {
    const canShowFaceitLink = !!user.isFaceitLinked && !!user.faceitNickname;
    // Генерируем URL профиля Faceit
    const faceitProfileUrl = `https://www.faceit.com/ru/players/${user.faceitNickname}`;
    return (_jsx("div", { className: "profile-card clean-profile", children: _jsxs("div", { className: "profile-header", children: [_jsx("img", { className: "profile-avatar", src: user.avatarUrl || "https://ui-avatars.com/api/?name=User", alt: "\u0410\u0432\u0430\u0442\u0430\u0440" }), _jsxs("div", { className: "profile-main-info", children: [_jsx("div", { className: "profile-nickname", children: canShowFaceitLink ? (_jsx("a", { href: faceitProfileUrl, target: "_blank", rel: "noopener noreferrer", className: "faceit-linked", title: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C \u043D\u0430 Faceit", children: user.faceitNickname })) : (user.faceitNickname || user.name) }), _jsxs("div", { className: "profile-id", children: ["ID#", user.id] })] }), canShowFaceitLink && (_jsx("a", { href: faceitProfileUrl, target: "_blank", rel: "noopener noreferrer", className: "faceit-icon-link", title: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C \u043D\u0430 Faceit", children: _jsx("img", { src: "/images/faceit.jpg", alt: "Faceit", className: "faceit-icon" }) }))] }) }));
};
export default UserProfile;
