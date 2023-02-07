import { AuthState } from '../rules/interfaces';
import { AuthAction } from '../types/types';

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {

        case 'logIn':
            return {
                ...state,
                status: 'loged',
                person: action.payload.person
            }

        case 'logOut':
            return {
                ...state,
                status: 'no-loged',
                person: null,
                page: 'home'
            }

        case 'setPage':
            return {
                ...state,
                page: action.payload.page
            }

        default:
            return state;
    }
}
