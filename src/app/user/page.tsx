import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import BottomNavbar from "../components/bottomNavbar";
import Button from "../components/button";
import TopNavbar from "../components/topNavbar";

type CarouselItem = {
  src: string;
  label: string;
};

const carouselItems: CarouselItem[] = [
  { src: "/carusel1.png", label: "Miljøvennlig" },
  { src: "/carusel2.png", label: "Trygt" },
  { src: "/carusel3.png", label: "Lovlig" },
];

function CarouselCard({ src, label }: CarouselItem) {
  return (
    <div className="relative w-64 h-40 rounded-xl overflow-hidden flex-shrink-0">
      <Image src={src} alt={label} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <span className="absolute bottom-4 left-4 text-white text-2xl font-bold">
        {label}
      </span>
    </div>
  );
}

export default async function UserPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token");

  // Validate session token with backend
  let isValidSession = false;
  if (sessionToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/auth/validate-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionToken: sessionToken.value }),
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        isValidSession = data.valid === true;
      }
    } catch {
      // If validation fails or API is unavailable, we still reject access for security
      isValidSession = false;
    }
  }

  // Hvis session_token mangler eller er ugyldig, vis innloggingsside
  if (!sessionToken || !isValidSession) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-6 px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-black text-center">
            Du må logge inn
          </h1>
          <Link
            href="/login?redirect=/user"
            className="px-6 py-3 bg-[#3b9afb] text-white rounded-sm font-medium hover:bg-[#2a8aeb] transition-colors"
          >
            Logg inn
          </Link>
        </div>
      </div>
    );
  }

  // Hvis brukeren er innlogget, vis normal side
  return (
    <div className="min-h-screen flex flex-col bg-black md:pt-16">

      <TopNavbar />
      
      {/* Hovedinnhold */}
      <section className="relative h-[70vh] w-full">
        <Image
          src="/landing.png"
          alt="Svipp bakgrunn"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        

        <div className="relative z-10 flex flex-col justify-between h-full px-6 pt-10 pb-12">
          <div className="flex justify-center">
            <Image
              src="/svipp.svg"
              alt="Svipp logo"
              width={160}
              height={40}
            />
          </div>

          <div className="flex flex-col items-center text-center gap-4 px-2">
            <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight max-w-md mx-auto">
              Vi kjører deg og bilen hjem
            </h1>

            <p className="text-white/90 text-sm md:text-base max-w-md mx-auto">
              Svipp er løsningen når du har tatt bil til fest og ikke kan kjøre
              selv. En godkjent sjåfør kjører deg og bilen trygt hjem.
            </p>

            <div className="mt-4 w-full max-w-xs">
              <Link href="/user/order">
                <Button
                  text="Bestill sjåfør"
                  bgColor="Primary"
                  textColor="White"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bilde-karusell */}
      <section className="bg-white pt-4 pb-20 px-4">
        <div className="flex gap-8 overflow-x-auto md:justify-center">
          {carouselItems.map((item) => (
            <CarouselCard key={item.label} src={item.src} label={item.label} />
          ))}
        </div>
      </section>

      <BottomNavbar />
    </div>
  );
}