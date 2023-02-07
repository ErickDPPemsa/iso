export const getExpired = (date: Date) => {
    const Fecha = new Date(date);
    const Final = new Date(Fecha.getTime() + Fecha.getTimezoneOffset() * 60000);
    const actual = new Date();

    const s = Math.floor((Final.getTime() - actual.getTime()) / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);


    const hours = Math.floor(h);
    const minutes = Math.floor(m - (h * 60));
    const seconds = Math.floor(s - (((m === 0) ? 1 : m * 60) * ((h === 0) ? 1 : h)));

    return { hours, minutes, seconds }
}

export const getMinutes = (time: number) => {
    const s = Math.floor((time) / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const hours = Math.floor(h);
    const minutes = Math.floor(m - (h * 60));
    const seconds = Math.floor(s - (((m === 0) ? 1 : m * 60) * ((h === 0) ? 1 : h))) + 1;
    return { hours, minutes, seconds }
}

export const FormatoFechaPlusMinus = (seconds: number, minutes: number, hours: number): string => {
    const fecha = new Date();
    fecha.setHours(fecha.getHours() + hours);
    fecha.setMinutes(fecha.getMinutes() + minutes);
    fecha.setSeconds(fecha.getSeconds() + seconds);
    const a: number = fecha.getFullYear();
    const m: number = fecha.getMonth();
    const d: number = fecha.getDate();
    const h: number = fecha.getHours();
    const min: number = fecha.getMinutes();
    const seg: number = fecha.getSeconds();
    return `${a}-${m + 1}-${d} ${h}:${min}:${seg}`;
}

export const errorFormat = (msg: string) => {
    return msg.replace(/Error/g, '').replace(/:/g, '');
}

export interface date {
    date: string;
    day: number;
    month: number;
    year: number;
};

export interface time {
    time: string;
    hour: number;
    minute: number;
    second: number;
};
export interface formatDate {
    DATE: Date;
    date: date;
    time: time;
    weekday: number;
}

export const getDate = (): formatDate => {
    const newDate: Date = new Date();
    const [day, month, year]: Array<string> = newDate.toLocaleDateString().split('/');
    const date: string = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const time: string = `${newDate.toTimeString().slice(0, 8)}`;
    const [hour, minute, second]: Array<number> = time.split(':').map(m => parseInt(m));
    const json: string = `${date}T${time}.000Z`;
    const dateGenerated: Date = new Date(json);
    const weekday = dateGenerated.getDay();
    return {
        DATE: dateGenerated,
        date: { date, day: parseInt(day), month: parseInt(month), year: parseInt(year) },
        time: { time, hour, minute, second },
        weekday
    };
}

export const modDate = ({ hours, minutes, seconds, dateI, days, months }: { dateI?: Date, seconds?: number, minutes?: number, hours?: number, days?: number, months?: number }): formatDate => {
    const newDate = (dateI) ? new Date(dateI.toJSON()) : getDate().DATE;
    (hours) && newDate.setHours(newDate.getHours() + hours);
    (minutes) && newDate.setMinutes(newDate.getMinutes() + minutes);
    (seconds) && newDate.setSeconds(newDate.getSeconds() + seconds);
    (days) && newDate.setDate(newDate.getDate() + days);
    (months) && newDate.setMonth(newDate.getMonth() + months);
    const [date, time] = newDate.toJSON().split('.')[0].split('T');
    const [year, month, day]: Array<number> = date.split('-').map(m => parseInt(m));
    const [hour, minute, second]: Array<number> = time.split(':').map(m => parseInt(m));
    const weekday = newDate.getDay();
    return {
        DATE: newDate,
        date: { date, day, month, year },
        time: { time, hour, minute, second },
        weekday
    };
}