import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const NavBar = () => {
    const { status, logOut, person } = useContext(AuthContext);
    const [isOpen, setisOpen] = useState<boolean>(false);

    return (
        <nav className='containerNav'>
            {
                (status !== 'no-loged')
                &&
                <>
                    <div className='logo'>
                        <img
                            src="https://pem-sa.ddns.me/assets/logos/logo2.png"
                            alt=""
                        />
                    </div>
                    <div className='menu'>
                        <div className='dropdown' onClick={({ target }) => {
                            setisOpen(!isOpen);
                            const drop = document.querySelector('#Drop');
                            if (drop) {
                                if (isOpen) {
                                    drop.setAttribute('style', 'display:none');
                                } else {
                                    drop.setAttribute('style', 'display:block');
                                }
                            }
                        }}>
                            <button className="dropbtn">
                                <i className='material-icons'>insert_drive_file</i>
                                <p>CONSULTAR</p>
                                <i className='material-icons'>arrow_drop_down</i>
                            </button>

                            <div id='Drop' className='content'>
                                <NavLink className={'option sinLinea'} to={'/SI'}>
                                    <p className='item'><i className="material-icons icon_item">insert_drive_file</i> SISTEMAS INTALADOS </p>
                                </NavLink>
                                <NavLink className={'option sinLinea'} to={'/SrsSta'}>
                                    <p className='item'><i className="material-icons icon_item">insert_drive_file</i> SRS Y STA </p>
                                </NavLink>
                                <NavLink className={'option sinLinea'} to={'/TessTesse'}>
                                    <p className='item'><i className="material-icons icon_item">insert_drive_file</i> TESS Y TESSE </p>
                                </NavLink>
                                <NavLink className={'option sinLinea'} to={'/At5mA'}>
                                    <p className='item'><i className="material-icons icon_item">insert_drive_file</i> AT5MA </p>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className='exit'>
                        <NavLink className={'option sinLinea'} to={'/home'}>
                            <p className='item'><i className="material-icons icon_item">home</i></p>
                        </NavLink>
                        <p>{person?.Name}</p>
                        <div className='containerBtn'>
                            <button className='btn2' onClick={() => logOut()}>
                                Cerrar sesión
                            </button>
                        </div>
                    </div>


                </>
            }
        </nav>
    )
}
