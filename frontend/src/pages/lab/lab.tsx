import React, { useState, useEffect } from "react";
import LabNavbar from "../../components/LabNavbar/LabNavbar";
import Sidebar from "../../components/Sidebar";
import UserProfile, { User as ProfileUser } from "./UserProfile";
import SettingsPage from "./SettingsPage";
import "./lab-page.css";
import "./lab-main.css";
import "./lab-content.css";
import "./lab-sidebar.css";
import "./lab-header.css";
import "./Profile.css";

const API_BASE = "https://api.fak1e-lab.ru";

type UserRole = "new" | "active" | "ex-player" | "coach";
type UserTariff = "lite" | "plus" | "pro" | null;

export interface User extends ProfileUser {
    role: UserRole;
    tariff: UserTariff;
    googleEmail?: string | null;
    yandexEmail?: string | null;
    yandexId?: string | null;
}

// ===== Типы для теории =====

interface TheoryMaterial {
    id: number;
    title: string;
    content: string | null;
    external_url: string | null;
    order: number;
}

interface TheorySection {
    id: number;
    type: "lectures" | "records" | "guides" | "streams" | string;
    title: string;
    materials: TheoryMaterial[];
}

interface TheoryCourse {
    id: number;
    title: string;
    description: string | null;
    sections: TheorySection[];
}

interface PublicCourse {
    id: number;
    title: string;
    description: string | null;
}

const Lab: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sessionParam = params.get("session");

        let token = sessionParam || window.localStorage.getItem("session_token");

        if (sessionParam) {
            window.localStorage.setItem("session_token", sessionParam);

            params.delete("session");
            const newQs = params.toString();
            const newUrl = window.location.pathname + (newQs ? `?${newQs}` : "");
            window.history.replaceState({}, "", newUrl);
        }

        if (!token) {
            window.location.href = "/";
            return;
        }

        (async () => {
            try {
                const resp = await fetch(`${API_BASE}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!resp.ok) {
                    console.error("auth/me error", await resp.text());
                    window.localStorage.removeItem("session_token");
                    window.location.href = "/";
                    return;
                }
                const data = await resp.json();
                const providers: string[] = data.providers || [];
                const u: User = {
                    id: String(data.id),
                    name: data.name || "Пользователь",
                    role: "active",
                    tariff: "plus",
                    avatarUrl: data.avatar_url || "",
                    faceitNickname: data.name || "",
                    isGoogleLinked: providers.includes("google"),
                    isYandexLinked: providers.includes("yandex"),
                };
                setUser(u);
            } catch (e) {
                console.error("auth/me failed", e);
                window.localStorage.removeItem("session_token");
                window.location.href = "/";
            }
        })();
    }, []);

    if (!user) {
        return (
            <>
                <LabNavbar />
                <div className="lab-page">
                    <main className="lab-main">
                        <p>Загрузка...</p>
                    </main>
                </div>
            </>
        );
    }

    if (user.role === "coach") return <CoachDashboard user={user} />;
    if (user.role === "active")
        return <ActivePlayerDashboard user={user} setUser={setUser} />;
    if (user.role === "ex-player") return <ExPlayerDashboard user={user} />;
    return <NewUserDashboard user={user} />;
};

function CoachDashboard({ user }: { user: User }) {
    return (
        <>
            <LabNavbar />
            <div className="lab-page">
                <h1>Кабинет тренера</h1>
                <p>Добро пожаловать, {user.name}!</p>
            </div>
        </>
    );
}

function ExPlayerDashboard({ user }: { user: User }) {
    return (
        <>
            <LabNavbar />
            <div className="lab-page">
                <main className="lab-main">
                    <h1>Кабинет для бывшего игрока</h1>
                    <p>Статистика, архив и предложения по возврату в сезон.</p>
                </main>
            </div>
        </>
    );
}

function NewUserDashboard({ user }: { user: User }) {
    return (
        <>
            <LabNavbar />
            <div className="lab-page">
                <main className="lab-main">
                    <h1>Добро пожаловать, {user.name}!</h1>
                    <p>Для доступа к тренировкам выбери или купи тариф:</p>
                </main>
            </div>
        </>
    );
}

interface ActivePlayerDashboardProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const TABS = [
    "Профиль",
    "Теория",
    "Пракки",
    "Домашние задания",
    "Поддержка",
    "Настройки",
];

const ActivePlayerDashboard: React.FC<ActivePlayerDashboardProps> = ({
    user,
    setUser,
}) => {
    const [currentTab, setCurrentTab] = useState("Профиль");

    // === состояние для теории ===
    const [courses, setCourses] = useState<PublicCourse[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [courseTheory, setCourseTheory] = useState<TheoryCourse | null>(null);
    const [theoryLoading, setTheoryLoading] = useState(false);
    const [theoryError, setTheoryError] = useState<string | null>(null);
    const [activeSectionType, setActiveSectionType] = useState<
        "lectures" | "records" | "guides" | "streams"
    >("lectures");

    // загружаем курсы при первом входе во вкладку "Теория"
    useEffect(() => {
        if (currentTab !== "Теория") return;
        if (courses.length > 0) return;

        const fetchCoursesAndTheory = async () => {
            try {
                setTheoryLoading(true);
                setTheoryError(null);

                const resp = await fetch(`${API_BASE}/courses`);
                if (!resp.ok) {
                    throw new Error(`Ошибка загрузки курсов: ${resp.status}`);
                }
                const data: PublicCourse[] = await resp.json();
                setCourses(data);

                if (data.length > 0) {
                    const firstId = data[0].id;
                    setSelectedCourseId(firstId);

                    const theoryResp = await fetch(`${API_BASE}/courses/${firstId}/theory`);
                    if (!theoryResp.ok) {
                        throw new Error(`Ошибка загрузки теории: ${theoryResp.status}`);
                    }
                    const theoryData: TheoryCourse = await theoryResp.json();
                    setCourseTheory(theoryData);
                }
            } catch (e: any) {
                console.error("load theory failed", e);
                setTheoryError(e.message || "Ошибка загрузки теории");
            } finally {
                setTheoryLoading(false);
            }
        };

        fetchCoursesAndTheory();
    }, [currentTab, courses.length]);

    const changeCourse = async (courseId: number) => {
        try {
            setTheoryLoading(true);
            setTheoryError(null);
            setSelectedCourseId(courseId);
            setCourseTheory(null);

            const resp = await fetch(`${API_BASE}/courses/${courseId}/theory`);
            if (!resp.ok) {
                throw new Error(`Ошибка загрузки теории: ${resp.status}`);
            }
            const data: TheoryCourse = await resp.json();
            setCourseTheory(data);
            setActiveSectionType("lectures");
        } catch (e: any) {
            console.error("change course failed", e);
            setTheoryError(e.message || "Ошибка загрузки теории");
        } finally {
            setTheoryLoading(false);
        }
    };

    const handleProfileChange: (upd: Partial<User>) => void = (upd) => {
        setUser((prev) => (prev ? { ...prev, ...upd } : prev));
    };

    const handleAccountLink = (service: string) => {
        setUser((prev) =>
            prev
                ? ({
                    ...prev,
                    [`is${service}Linked`]: true,
                } as unknown as User)
                : prev,
        );
    };

    const renderTheoryTab = () => {
        if (theoryLoading && !courseTheory) {
            return <div style={{ padding: 24 }}>Загрузка теории...</div>;
        }

        if (theoryError) {
            return (
                <div style={{ padding: 24, color: "red" }}>
                    Ошибка: {theoryError}
                </div>
            );
        }

        if (!courseTheory) {
            return (
                <div style={{ padding: 24 }}>
                    Курсы пока недоступны.
                </div>
            );
        }

        const sectionsByType: Record<string, TheorySection | undefined> = {};
        for (const s of courseTheory.sections) {
            sectionsByType[s.type] = s;
        }

        const currentSection = sectionsByType[activeSectionType];

        return (
            <div className="lab-theory" style={{ padding: 24 }}>
                {/* выбор курса */}
                <div className="lab-theory-courses" style={{ marginBottom: 16 }}>
                    {courses.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => changeCourse(c.id)}
                            style={{
                                marginRight: 8,
                                padding: "6px 12px",
                                borderRadius: 6,
                                border:
                                    c.id === selectedCourseId ? "2px solid #FF8C42" : "1px solid #444",
                                backgroundColor:
                                    c.id === selectedCourseId ? "#1E1E1E" : "transparent",
                                color: "#fff",
                                cursor: "pointer",
                            }}
                        >
                            {c.title}
                        </button>
                    ))}
                </div>

                {/* табы внутри курса */}
                <div className="lab-theory-tabs" style={{ marginBottom: 16 }}>
                    {[
                        { type: "lectures", label: "Лекции" },
                        { type: "records", label: "Записи" },
                        { type: "guides", label: "Гайды" },
                        { type: "streams", label: "Трансляции" },
                    ].map((tab) => (
                        <button
                            key={tab.type}
                            onClick={() =>
                                setActiveSectionType(tab.type as
                                    | "lectures"
                                    | "records"
                                    | "guides"
                                    | "streams")
                            }
                            style={{
                                marginRight: 8,
                                padding: "6px 12px",
                                borderRadius: 6,
                                border:
                                    activeSectionType === tab.type
                                        ? "2px solid #FF8C42"
                                        : "1px solid #444",
                                backgroundColor:
                                    activeSectionType === tab.type ? "#1E1E1E" : "transparent",
                                color: "#fff",
                                cursor: "pointer",
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* материалы */}
                <div className="lab-theory-materials">
                    {currentSection && currentSection.materials.length > 0 ? (
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {currentSection.materials.map((m) => (
                                <li
                                    key={m.id}
                                    style={{
                                        marginBottom: 12,
                                        padding: 12,
                                        borderRadius: 8,
                                        border: "1px solid #333",
                                    }}
                                >
                                    <div style={{ fontWeight: 600, marginBottom: 4 }}>
                                        {m.title}
                                    </div>
                                    {m.external_url && (
                                        <div style={{ marginBottom: 4 }}>
                                            <a
                                                href={m.external_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ color: "#FF8C42" }}
                                            >
                                                Открыть
                                            </a>
                                        </div>
                                    )}
                                    {m.content && (
                                        <div style={{ fontSize: 14, opacity: 0.9 }}>
                                            {m.content}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>Материалы пока не добавлены.</div>
                    )}
                </div>
            </div>
        );
    };

    const renderTabContent = () => {
        switch (currentTab) {
            case "Профиль":
                return <UserProfile user={user} />;
            case "Настройки":
                return (
                    <SettingsPage
                        user={user}
                        onChange={handleProfileChange}
                        onAccountLink={handleAccountLink}
                    />
                );
            case "Теория":
                return renderTheoryTab();
            default:
                return (
                    <div style={{ padding: 24 }}>
                        Секция «{currentTab}» — тут будет твой контент!
                    </div>
                );
        }
    };

    return (
        <>
            <LabNavbar />
            <div className="lab-page">
                <Sidebar
                    tabs={TABS}
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    user={{
                        avatarUrl: user.avatarUrl,
                        name: user.name,
                    }}
                />
                <main className="lab-main">{renderTabContent()}</main>
            </div>
        </>
    );
};

export default Lab;
