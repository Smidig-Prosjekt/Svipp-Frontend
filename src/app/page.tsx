import Link from "next/link";
import BottomNavbar from "./components/bottomNavbar";

export default function OpeningPage() {
  return (
    <>
      <h1>Åpnings siden!</h1>
      <Link href="/login" className="text-blue-700 underline">Login</Link>
    </>
  );
}
