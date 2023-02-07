import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { logIn, validarJWT } from '../api/Api';
import { ShowError } from '../components/Swal';
import { AuthContext } from '../context/AuthContext';
import { errorFormat } from '../functions/Functions';
import { useForm } from '../hooks/useForm';
import logo from '../logo.png';

export const LogInPage = () => {
    const { setPerson, logOut } = useContext(AuthContext);
    const [isShowPassword, setisShowPassword] = useState(false);
    const { onChange, acceso, password, formulario, reset } = useForm({
        acceso: '',
        password: ''
    });

    const JWT = useQuery(["JWT"], () => validarJWT(),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            enabled: true,
            onSuccess: async ({ Person, token }) => setPerson(Person, token),
            onError: async error => {
                if (`${error}`.includes('JsonWebTokenError') || `${error}`.includes('TokenExpiredError')) {
                    await ShowError('La sesión expiró');
                }
                if (!`${error}`.includes('No hay token en la petición'))
                    await ShowError(errorFormat(`${error}`));
                localStorage.clear();
                logOut();
            }
        }
    );

    const LogIn = useQuery(["LogIn"], () => logIn(formulario),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            enabled: false,
            retry: 1,
            onSuccess: async ({ Person, token }) => setPerson(Person, token),
            onError: async error => await ShowError(`${error}`)
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        LogIn.refetch();
        reset();
    }

    return (
        <div className='fullPage centerFlex'>
            <section className='container-form'>
                {
                    (LogIn.isFetching || JWT.isFetching) ?
                        <div className='spin'></div>
                        :
                        <>
                            <img
                                src={logo}
                                alt="img"
                                height={300}
                            />
                            <p className='text'>INICIAR SESIÓN</p>
                            <div className='caja-form'>
                                <form className='form_login' action="" onSubmit={(event) => handleSubmit(event)}>
                                    <div className='container-inputs'>
                                        <label className='container-icon'>
                                            <i className="material-icons icon">person</i>
                                        </label>
                                        <input
                                            required={true}
                                            className='inputs'
                                            type="text"
                                            name="acceso"
                                            value={acceso}
                                            placeholder='usuario'
                                            autoComplete='off'
                                            onChange={({ target }) => onChange(target.value, 'acceso')}
                                        />
                                    </div>
                                    <div className='container-inputs'>
                                        <label className='container-icon'>
                                            <i className="material-icons icon">lock</i>
                                        </label>
                                        <label
                                            className='container-icon-right'
                                            onClick={() => setisShowPassword(!isShowPassword)}
                                        >
                                            <i className="material-icons icon">{(isShowPassword) ? 'visibility' : 'visibility_off'}</i>
                                        </label>
                                        <input
                                            required={true}
                                            className='inputs'
                                            type={(isShowPassword) ? 'text' : 'password'}
                                            name="password"
                                            value={password}
                                            placeholder='********'
                                            autoComplete='off'
                                            onChange={({ target }) => onChange(target.value, 'password')}
                                        />
                                    </div>
                                    <div className='containerBtn'>
                                        <input className='btn' type="submit" value="Inicia Sesión" />
                                    </div>
                                </form>
                            </div>
                        </>
                }
            </section >
        </div >
    )
}
