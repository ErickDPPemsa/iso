import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { LogInPage } from '../pages/LogInPage';

export const PublicRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<LogInPage />} />
            <Route path="login" element={<LogInPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes >
    )
}
