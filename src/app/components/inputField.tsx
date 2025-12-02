import { HTMLInputTypeAttribute } from "react";

/* 
    How to use: 
    <InputField title="Passord" onChange={handleChange} type='password' required value={show an existing value here, like pickup and delivery address that is already chosen.} placeholder="Skriv inn ditt passord"></InputField>
*/

type Props = {
    title?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: HTMLInputTypeAttribute;
    required?: boolean;
    value?: string;
    placeholder: string;
}

export default function InputField({ title, onChange, type, required, value, placeholder}: Props) {
    return (
        <div className="w-full">
            <h1 className="font-medium">{title}</h1>
            <input onChange={onChange} type={type} required={required} value={value} placeholder={placeholder} className="w-full h-10 border border-gray-400 rounded-sm font-medium pl-4"></input>
        </div>
    )
}