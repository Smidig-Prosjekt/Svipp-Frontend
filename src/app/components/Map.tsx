"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = { lat: 59.9139, lng: 10.7522 }; // Oslo som fallback

type LatLng = {
  lat: number;
  lng: number;
};

export default function Map() {
  const [position, setPosition] = useState<LatLng | null>(null);

  // Les nøkkelen fra env. Må starte med NEXT_PUBLIC_ for å være tilgjengelig i klient.
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;

  if (!apiKey) {
    console.error(
      "Google Maps API key mangler. Sett NEXT_PUBLIC_GOOGLE_MAPS_API i .env eller .env.local i Svipp-Frontend."
    );
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script-stable",
    googleMapsApiKey: apiKey ?? "",
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        // Ved feil brukes default center
      }
    );
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-gray-600">
        Laster kart...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position ?? defaultCenter}
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

