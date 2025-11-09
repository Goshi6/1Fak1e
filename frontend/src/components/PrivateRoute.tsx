// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";

// Для эмуляции — всегда true, позже заменится на реальную проверку
const isLoggedIn = true;

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
    //                                    ^^^^^^------------------^
    // Всегда используй React.ReactElement вместо JSX.Element — безопаснее!
    return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
