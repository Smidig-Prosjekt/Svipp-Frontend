import { useRouter } from "next/navigation";
import LeftArrowIcon from "../icons/leftArrowIcon";

/* 
    How to use: 
    <LeftArrowIconButton />
*/

export default function LeftArrowIconButton() {
    const router = useRouter()
    return (
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
            <LeftArrowIcon className="w-6 h-6"/>
        </button>
    )
}