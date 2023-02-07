import { LogInData, Person, ResponseApi, datalogIn, account, events } from '../rules/interfaces';

const baseUrl = 'https://monweb.pem-sa.com.mx/api';
// const baseUrl = 'http://127.0.0.1:3014/api';
export const Api = (endpoint: string, data: object = {}, method: 'GET' | 'POST' = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token');
    const headers: HeadersInit | undefined = {};
    (token) ? Object.assign(headers, { 'Content-type': 'application/json', 'x-token': token }) : Object.assign(headers, { 'Content-type': 'application/json', });
    return (method === 'GET') ? fetch(url, { method, headers }) : fetch(url, { method, headers, body: JSON.stringify(data) });
}

export const logIn = async ({ acceso, password }: LogInData) => {
    try {
        const response = await Api('auth/logIn', { acceso, password }, 'POST');
        const { status, data, errors }: ResponseApi<datalogIn> = await response.json();
        if (status && data)
            return data;
        throw new Error(errors![0].msg);
    } catch (error) { throw new Error(`${error}`); }
};

export const validarJWT = async () => {
    try {
        const response = await Api('auth/validaJWT', {}, 'GET');
        const { status, data, errors }: ResponseApi<datalogIn> = await response.json();
        if (status && data)
            return data;
        throw new Error(errors![0].msg);
    } catch (error) { throw new Error(`${error}`); }
};

export const getEvents = async ({ end, start, events }: { start: string, end: string, events: 'SrsSta' | 'TessTese' | 'At5mA' }) => {
    try {
        const response = await Api(`sys/getEvents/${start}/${end}/${events}`, {}, 'GET');
        const { status, data, errors }: ResponseApi<events> = await response.json();
        if (status && data)
            return data;
        throw new Error(errors![0].msg);
    } catch (error) { throw new Error(`${error}`); }
}

export const getAccounts = async () => {
    try {
        const response = await Api(`sys/getAccounts?panel=true`, {}, 'GET');
        const { status, data, errors }: ResponseApi<{ accountsWithPanel: Array<account>, accountsWithOutPanel: Array<account> }> = await response.json();
        if (status && data)
            return data;
        throw new Error(errors![0].msg);
    } catch (error) { throw new Error(`${error}`); }
}



