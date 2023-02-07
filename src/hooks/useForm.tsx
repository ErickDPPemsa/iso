import { useState } from "react";

type value = string | number | boolean | object | Array<string>;
export const useForm = <T extends Object>(formulario: T) => {
    const [values, setValues] = useState(formulario);
    const reset = () => {
        setValues(formulario);
    }
    const onChange = (value: value, campo: string) => {
        setValues({
            ...values,
            [campo]: value
        });
    }
    return { ...values, formulario: values, onChange, reset };
}
