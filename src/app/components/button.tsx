/* 
    How to use: 
    <Button handleOnClick={handleSubmit} text='Fortsett med Google' bgColor='Primary' textColor='white' icon={<GoogleIcon />} />
*/

"use client";

type Props = {
    handleOnClick?: () => void;
    text: string;
    bgColor: keyof typeof ButtonBgColorVariants;
    textColor: keyof typeof ButtonTextColorVariants;
    icon?: React.ReactNode;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

const ButtonBgColorVariants = {
    Primary: "bg-[#3b9afb]",
    Danger: "bg-[#ea4335]",
    Dark: "bg-[#000000]",
    Light: "bg-[#ffffff]"
}

const ButtonTextColorVariants = {
    White: "text-white",
    Black: "text-black"
}

export default function Button({ handleOnClick, text, bgColor, textColor, icon, disabled, type = "button" }: Props) {
    return (
        <button onClick={handleOnClick} type={type} disabled={disabled} className={`w-full h-10 rounded-sm font-medium flex items-center justify-center gap-4 ${ButtonBgColorVariants[bgColor]} ${ButtonTextColorVariants[textColor]}`}>
            {icon}
            {text}
        </button> 
    )
}