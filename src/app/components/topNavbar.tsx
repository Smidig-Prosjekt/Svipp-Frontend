import Link from "next/link";

export default function TopNavbar() {
    return (
        <div className="w-full h-16 rounded-sm flex justify-center items-center fixed top-0 gap-16 bg-white hidden md:flex">
            <Link href="/user">
                <h1>Hjem</h1>
            </Link>

            <Link href="/">
                <h1>Historikk</h1>
            </Link>

            <Link href="/">
                <h1>Profil</h1>
            </Link>
        </div>
    )
}