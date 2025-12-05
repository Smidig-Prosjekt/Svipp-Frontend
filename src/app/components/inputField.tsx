import { HTMLInputTypeAttribute } from "react";

/*
    How to use:
    <InputField
        title="Passord"
        onChange={handleChange}
        type='password'
        required
        value={password}
        placeholder="Skriv inn ditt passord"
        error="Passord må være minst 8 tegn"
    />
*/

type Props = {
    title?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: HTMLInputTypeAttribute;
    required?: boolean;
    value?: string;
    placeholder: string;
    error?: string;
    name?: string;
}

export default function InputField({ title, onChange, type, required, value, placeholder, error, name}: Props) {
    return (
        <div className="w-full">
            {title && <h1 className="font-medium">{title}</h1>}
            <input
                name={name}
                onChange={onChange}
                type={type}
                required={required}
                value={value}
                placeholder={placeholder}
                className={`w-full h-10 border rounded-sm font-medium pl-4 bg-white ${
                    error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-400"
                }`}
            />
            {error && (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            )}
        </div>
    )
}