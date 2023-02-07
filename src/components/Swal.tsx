import Swal, { SweetAlertIcon } from "sweetalert2";

export const ShowError = async (error: string) => {
    return await Swal.fire({
        title: 'ERROR',
        text: error,
        icon: 'error',
        confirmButtonColor: '#002f6c',
        iconColor: '#b20010',
        color: '#002f6c'
    });
}

export const ShowAlert = async (alert: string) => {
    return await Swal.fire({
        title: 'ALERTA',
        text: alert,
        icon: 'warning',
        confirmButtonColor: '#002f6c',
        iconColor: '#002f6c',
        color: '#002f6c'
    });
}

interface showMesage {
    title: string,
    text: string,
    timer?: number;
    icon?: SweetAlertIcon | undefined;
    func?: () => void | Promise<void>;
    confirmText?: string;
    denyText?: string;
}

export const ShowMessage = async ({ text, title, timer, icon }: showMesage) => {
    return await Swal.fire({
        title,
        text,
        icon: icon,
        timer,
        confirmButtonColor: '#002f6c',
        iconColor: '#002f6c',
        color: '#002f6c'
    });
}

export const ShowMessage2 = async ({ text, title, timer, func, icon, confirmText, denyText }: showMesage) => {
    return await Swal.fire({
        title,
        text,
        icon,
        timer,
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: (confirmText) ? confirmText : 'SI',
        showDenyButton: true,
        denyButtonText: (denyText) ? denyText : 'NO',
        denyButtonColor: '#7b0000',
        confirmButtonColor: '#002f6c',
        iconColor: '#002f6c',
        color: '#002f6c'
    }).then(async ({ isConfirmed }) => {
        if (isConfirmed && func) { func(); }
    })
}