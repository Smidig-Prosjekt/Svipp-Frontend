"use client";

import BottomNavbar from "@/app/components/bottomNavbar";
import Map from "@/app/components/Map";
import TopNavbar from "@/app/components/topNavbar";

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
            Velg posisjon for henting
          </h1>
          <p className="text-sm text-gray-600">
            Kartet viser nåværende posisjon som utgangspunkt (hentet via
            nettleser/Google Maps API). Denne siden skal senere kobles mot
            backend for å hente og vise tilgjengelige sjåfører.
          </p>
        </section>
      </main>

      <BottomNavbar />
    </div>
  );
}