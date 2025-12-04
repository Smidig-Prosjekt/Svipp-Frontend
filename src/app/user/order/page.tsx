"use client";

import BottomNavbar from "../../components/bottomNavbar";
import Map from "../../components/map";
import TopNavbar from "../../components/topNavbar";

export default function OrderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white md:pt-16">
      <TopNavbar />

      <main className="flex-1 flex flex-col">
        <section className="flex-1 relative">
          <div className="absolute inset-0">
            <Map />
          </div>
        </section>

        <section className="p-4 bg-white shadow-md border-t border-gray-200">
          <h1 className="text-lg font-semibold mb-1">
            Velg sjåfør
          </h1>
          <p className="text-sm text-gray-600">
            Klikk på en sjåfør (rød markør) for å se detaljer og bestille.
          </p>
        </section>
      </main>

      <BottomNavbar />
    </div>
  );
}