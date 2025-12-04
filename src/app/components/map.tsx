"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

/** Oslo coordinates used as fallback when geolocation is unavailable */
const OSLO_COORDINATES = { lat: 59.9139, lng: 10.7522 };

type LatLng = {
  lat: number;
  lng: number;
};

// Les nøkkelen fra env. Må starte med NEXT_PUBLIC_ for å være tilgjengelig i klient.
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;

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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script-stable",
    googleMapsApiKey: apiKey ?? "",
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    let isMounted = true;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (isMounted) {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        }
      },
      () => {
        // Ved feil brukes default center
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
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position ?? OSLO_COORDINATES}
      zoom={position ? 14 : 11}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {position && <Marker position={position} />}
    </GoogleMap>
  );
}

