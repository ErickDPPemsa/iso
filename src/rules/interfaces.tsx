import { pages } from "../types/types";

export interface AuthState {
    status: 'loged' | 'no-loged';
    person: Person | null;
    page: pages;
}

export interface Person {
    ID: string;
    Name: string;
    User: string;
    Password: string;
}

export interface LogInData {
    acceso: string;
    password: string;
}

export interface Errors {
    msg: string;
    param: string;
    value: string;
    location: string;
}

export interface ResponseApi<T> {
    status: boolean;
    data?: T;
    errors?: Array<Errors>
}

export interface events {
    srs?: Array<Array<string>>;
    sta?: Array<Array<string>>;
    srsPending?: Array<Array<string>>;
    tess?: Array<Array<string>>;
    tese?: Array<Array<string>>;
    at5ma?: Array<Array<string>>;
}

export interface datalogIn {
    Person: Person;
    token: string;
}

export interface event {
    FechaOriginal: string;
    FechaFormat: string;
    Dia: string;
    Hora: string;
    CodigoEvento: string;
    CodigoAlarma: string;
    DescripcionAlarm: string;
    CodigoZona: string;
    DescripcionZona: string;
    CodigoUsuario: string;
    NombreUsuario: string;
    DescripcionEvent: string;
    Particion: number;
    ClaveMonitorista: string;
    NomCalifEvento: string;
    FechaPrimeraToma: string;
    HoraPrimeraToma: string;
    FechaFinalizo: string;
    HoraFinalizo: string;
}
export interface comment {
    CodigoCliente: string;
    Comentario: string;
    Contacto: string;
    FechaEvento: string;
    FechaLlamada: string;
    HoraEvento: string;
    HoraLlamada: string;
    TelefonoAl: string;
}

export interface account {
    Nombre: string;
    Direccion: string;
    CodigoCte: string;
    CodigoAbonado: string;
    haveEvents?: boolean;
    eventos?: Array<event>;
    comentarios?: Array<comment>;
    CodigoReceptora?: number;
    DP?: string;
}
