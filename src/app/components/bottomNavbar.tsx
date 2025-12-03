import Link from "next/link";
import { AiOutlineHistory } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { IoCarOutline, IoPersonOutline } from "react-icons/io5";

export default function BottomNavbar() {
    return (
        <div className="w-full h-16 flex justify-evenly items-center fixed bottom-0 bg-white md:hidden">
            <Link href="/user">
                <GoHome className="w-8 h-8"/>
            </Link>

            <Link href="/">
                <AiOutlineHistory className="w-8 h-8"/>
            </Link>

            <Link href="/">
                <IoPersonOutline className="w-8 h-8"/>
            </Link>
        </div>
    )
}