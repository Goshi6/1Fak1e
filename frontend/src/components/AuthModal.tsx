// src/components/AuthModal.tsx
import React, { useState } from "react";
import "../../public/styles.css";

const AuthModal = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
    const [form, setForm] = useState<"login" | "register">("login");

    if (!show) return null;

    return (
        <div id="authModal" className="auth-modal" style={{ display: show ? "flex" : "none" }}>
            <div className="auth-modal-content">
                <span className="auth-close" onClick={onClose}>&times;</span>
                <h2 className="auth-title">Войти в аккаунт</h2>
                <p className="auth-subtitle">Выберите способ входа или создайте новый аккаунт</p>

                <div className="auth-buttons">
                    <button className="auth-btn-google" /* onClick={signInWithGoogle} */>
                        {/* SVG */}
                        Войти через Google
                    </button>
                    <button className="auth-btn-yandex" /* onClick={signInWithYandex} */>
                        {/* SVG */}
                        Войти через Яндекс
                    </button>
                </div>

                <div className="auth-divider"><span>или</span></div>

                {form === "login" && (
                    <div id="loginForm" className="auth-form active">
                        <div className="auth-form-group">
                            <label htmlFor="loginEmail">Email</label>
                            <input type="email" id="loginEmail" placeholder="Введите ваш email" />
                        </div>
                        <div className="auth-form-group">
                            <label htmlFor="loginPassword">Пароль</label>
                            <input type="password" id="loginPassword" placeholder="Введите пароль" />
                        </div>
                        <button className="auth-form-btn" /* onClick={signInWithEmail} */>Войти</button>
                        <div className="auth-switch">
                            <a href="#" onClick={e => { e.preventDefault(); setForm("register"); }}>
                                Нет аккаунта? Зарегистрироваться
                            </a>
                        </div>
                    </div>
                )}

                {form === "register" && (
                    <div id="registerForm" className="auth-form active">
                        <div className="auth-form-group">
                            <label htmlFor="registerName">Имя</label>
                            <input type="text" id="registerName" placeholder="Введите ваше имя" />
                        </div>
                        <div className="auth-form-group">
                            <label htmlFor="registerEmail">Email</label>
                            <input type="email" id="registerEmail" placeholder="Введите ваш email" />
                        </div>
                        <div className="auth-form-group">
                            <label htmlFor="registerPassword">Пароль</label>
                            <input type="password" id="registerPassword" placeholder="Придумайте пароль" />
                        </div>
                        <div className="auth-form-group">
                            <label htmlFor="registerPasswordConfirm">Подтвердите пароль</label>
                            <input type="password" id="registerPasswordConfirm" placeholder="Повторите пароль" />
                        </div>
                        <button className="auth-form-btn" /* onClick={registerWithEmail} */>Зарегистрироваться</button>
                        <div className="auth-switch">
                            <a href="#" onClick={e => { e.preventDefault(); setForm("login"); }}>
                                Уже есть аккаунт? Войти
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
