import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { HomePage } from '../pages/HomePage';
import { SrsSta } from '../pages/SrsSta';
import { TessTesse } from '../pages/TessTesse';
import { At5mA } from '../pages/At5mA';
import { SystemInstaller } from '../pages/SystemInstaller';
import { resolve } from 'path';

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/SI' element={<SystemInstaller />} />
            <Route path='/SrsSta' element={<SrsSta />} />
            <Route path='/TessTesse' element={<TessTesse />} />
            <Route path='/At5mA' element={<At5mA />} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    )
}