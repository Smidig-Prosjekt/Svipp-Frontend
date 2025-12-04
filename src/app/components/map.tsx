"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { fetchMockDrivers, MockDriverDto } from "../lib/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type LatLng = {
  lat: number;
  lng: number;
};

type MockDriver = {
  id: number;
  name: string;
  rating: number;
  pricePerKm: number;
  position: LatLng;
};

// Les nøkkelen fra env. Må starte med NEXT_PUBLIC_ for å være tilgjengelig i klient.
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;

// Mapper backend-DTO til frontend-typen
function mapMockDriverDto(dto: MockDriverDto): MockDriver {
  return {
    id: dto.id,
    name: dto.name,
    rating: dto.rating,
    pricePerKm: dto.pricePerKm,
    position: {
      lat: dto.position.latitude,
      lng: dto.position.longitude,
    },
  };
}

/**
 * Displays a Google Map centered on the user's current location (if geolocation access is granted),
 * or Oslo as a fallback if location is unavailable.
 *
 * Requirements:
 * - Environment variable: NEXT_PUBLIC_GOOGLE_MAPS_API (Google Maps API key, must be set in .env or .env.local)
 * - User permission: Geolocation access (to display user's current location)
 */
export default function Map() {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<MockDriver[]>([]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script-stable",
    googleMapsApiKey: apiKey ?? "",
  });

  // Hent kundens posisjon
  useEffect(() => {
    if (!navigator.geolocation) return;

    let isMounted = true;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        if (isMounted && apiKey) {
          const newPosition = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setPosition(newPosition);

          try {
            const mockDriverDtos = await fetchMockDrivers(newPosition.lat, newPosition.lng, 5);
            if (isMounted) {
              setDrivers(mockDriverDtos.map(mapMockDriverDto));
            }
          } catch (error) {
            console.error("Feil ved henting av mock-sjåfører:", error);
          }
        }
      },
      (error) => {
        if (isMounted) {
          console.error("Feil ved henting av posisjon:", error);
          setGeoError(
            "Kunne ikke hente posisjon. Sjekk at posisjonstjenester er på og at nettleseren har tilgang."
          );
        }
      },
      {
        enableHighAccuracy: true, // Bruk GPS hvis tilgjengelig for bedre nøyaktighet
        timeout: 10000, // Maks 10 sekunder venting
        maximumAge: 60000, // Aksepter posisjon opptil 1 minutt gammel
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle missing API key with user-friendly error
  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-red-600">
        Google Maps API-nøkkel mangler. Kontakt administrator.
      </div>
    );
  }

  if (geoError && isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-red-600 text-center px-4">
        {geoError}
      </div>
    );
  }

  // Ikke vis kart før vi har forsøkt å hente posisjon (ingen Oslo-fallback)
  if (!position && isLoaded) {
    return (
      <div
        className="w-full h-full flex items-center justify-center text-sm text-gray-600"
        role="status"
        aria-live="polite"
      >
        Henter posisjon...
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className="w-full h-full flex items-center justify-center text-sm text-gray-600"
        role="status"
        aria-live="polite"
      >
        Laster kart...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position as LatLng}
        zoom={14}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {/* Kundens posisjon (svart marker) */}
        {position && (
          <Marker
            position={position}
            icon={{
              url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8" fill="#000000" stroke="#FFFFFF" stroke-width="2"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(20, 20),
              anchor: new google.maps.Point(10, 10),
            }}
          />
        )}

        {/* Sjåfør-markers (sykkel-ikon) */}
        {drivers.map((driver) => (
          <Marker
            key={driver.id}
            position={driver.position}
            icon={{
              url: "/bike_icon.svg",
              scaledSize: new google.maps.Size(33, 33),
              anchor: new google.maps.Point(16.5, 16.5),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
