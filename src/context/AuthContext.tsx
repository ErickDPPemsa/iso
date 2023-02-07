import { createContext, useReducer } from 'react';
import { AuthState, Person } from '../rules/interfaces';
import { AuthContextProps, pages } from '../types/types';
import { authReducer } from './authReducer';

const estadoInicial: AuthState = { status: 'no-loged', person: null, page: 'home' }

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, estadoInicial);

    const setPerson = (person: Person, token: string) => {
        localStorage.setItem('token', token);
        dispatch({
            type: 'logIn',
            payload: { person }
        })
    }

    const logOut = () => {
        localStorage.clear();
        dispatch({ type: 'logOut' });
    }

    const setPage = (page: pages) => {
        dispatch({
            type: 'setPage',
            payload: { page }
        })
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                setPerson,
                logOut,
                setPage,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

