import { useContext } from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const AppRouter = () => {
    const { status } = useContext(AuthContext)
    return (
        <div className='containerFull'>
            <HashRouter>
                <NavBar />
                <div className='containerPage'>
                    {/* {(status === 'no-loged') ? <PublicRoutes /> : <PrivateRoutes />} */}
                    {(status === 'no-loged') ? <PublicRoutes /> : <PrivateRoutes />}
                </div>
            </HashRouter>
        </div>
    )
}
