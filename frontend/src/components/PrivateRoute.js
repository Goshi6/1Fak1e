import { jsx as _jsx } from "react/jsx-runtime";
// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
// Для эмуляции — всегда true, позже заменится на реальную проверку
const isLoggedIn = true;
const PrivateRoute = ({ children }) => {
    //                                    ^^^^^^------------------^
    // Всегда используй React.ReactElement вместо JSX.Element — безопаснее!
    return isLoggedIn ? children : _jsx(Navigate, { to: "/" });
};
export default PrivateRoute;
