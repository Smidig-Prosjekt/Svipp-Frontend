import Link from "next/link";

export default function OpeningPage() {
  return (
    <>
      <h1>Åpnings siden!</h1>
      <Link href="/login" className="text-blue-700 underline">Login</Link>
    </>
  );
}
