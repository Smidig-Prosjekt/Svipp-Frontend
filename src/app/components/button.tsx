/* 
    How to use: 
    <Button handleOnClick={handleSubmit} text='Button' bgColor='Primary' textColor='white' />
*/

type Props = {
    handleOnClick: () => void;
    text: string;
    bgColor: keyof typeof ButtonBgColorVariants;
    textColor: keyof typeof ButtonTextColorVariants;
}

const ButtonBgColorVariants = {
    Primary: "bg-[#3b9afb]",
    Danger: "bg-[#ea4335]",
    dark: "bg-[#000000]",
    light: "bg-[#ffffff]"
}

const ButtonTextColorVariants = {
    white: "text-white",
    black: "text-black"
}

export default function Button({ handleOnClick, text, bgColor, textColor }: Props) {
    return (
        <button onClick={handleOnClick} type="submit" className={`w-full h-10 rounded-sm font-medium ${ButtonBgColorVariants[bgColor]} ${ButtonTextColorVariants[textColor]}`}>{text}</button> 
    )
}