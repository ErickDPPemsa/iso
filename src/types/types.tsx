import { Person } from '../rules/interfaces';

export type pages =
    | 'home'
    | 'new-service'
    | 'give-folio'
    | 'services'
    | 'crud-person'
    | 'crud-enterprice'
    | 'task'
    ;

export type AuthAction =
    | { type: 'logIn', payload: { person: Person } }
    | { type: 'logOut' }
    | { type: 'setPage', payload: { page: pages } }
    ;

export type AuthContextProps = {
    status: 'loged' | 'no-loged';
    person: Person | null;
    page: pages;
    setPerson: (person: Person, token: string) => void;
    logOut: () => void;
    setPage: (page: pages) => void;
}