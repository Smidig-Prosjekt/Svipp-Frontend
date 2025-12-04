// For lokal utvikling går alle kall via Next.js sitt eget domene (localhost:3000),
// og proxes videre til backend via rewrites i next.config.ts.
// I prod kan du evt. sette NEXT_PUBLIC_API_URL hvis API-et ligger på et annet domene.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type ApiErrorPayload = {
  message?: string;
  Message?: string;
  detail?: string;
  Detail?: string;
  errors?: Record<string, string[]>;
  Errors?: Record<string, string[]>;
};

function extractErrorMessage(data: ApiErrorPayload | undefined): string {
  if (!data) {
    return "Noe gikk galt mot API-et";
  }

  const errors = (data.errors ?? data.Errors) ?? undefined;
  if (errors && typeof errors === "object") {
    const messages = Object.values(errors).flat().filter(Boolean);
    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  const message =
    data.message ??
    data.Message ??
    data.detail ??
    data.Detail;

  if (message && message.trim().length > 0) {
    return message;
  }

  return "Noe gikk galt mot API-et";
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = (await res.json().catch(() => ({}))) as unknown;
  const errorPayload = data as ApiErrorPayload | undefined;

  if (!res.ok) {
    throw new Error(extractErrorMessage(errorPayload));
  }

  return data as T;
}

export async function loginRequest(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies in requests
    body: JSON.stringify({ email, password }),
  });

  const data = await handleResponse<{ token?: string }>(res);

  // The server sets an HttpOnly cookie with the token.
  return data;
}

export async function registerRequest(
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string
) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies in requests
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    }),
  });

  return handleResponse<{ token?: string }>(res);
}

export async function updateCustomerLocation(customerId: number, latitude: number, longitude: number) {
  const res = await fetch(`${API_URL}/api/locations/customers/${customerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ latitude, longitude }),
  });

  return handleResponse<{
    customerId: number;
    currentLatitude: number;
    currentLongitude: number;
    lastLocationUpdatedAt: string;
  }>(res);
}

export type MockDriverDto = {
  id: number;
  name: string;
  rating: number;
  pricePerKm: number;
  position: {
    latitude: number;
    longitude: number;
  };
};

export async function fetchMockDrivers(latitude: number, longitude: number, count: number = 5) {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    count: count.toString(),
  });

  const base = API_URL || ""; // tom streng gir relative URL i dev
  const res = await fetch(`${base}/api/locations/mock-drivers?${params.toString()}`, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse<MockDriverDto[]>(res);
}

export type RouteDto = {
  distanceKm: number;
  durationSeconds: number;
  encodedPolyline: string;
};

export async function fetchRoute(
  originLatitude: number,
  originLongitude: number,
  destinationLatitude: number,
  destinationLongitude: number
) {
  const params = new URLSearchParams({
    originLatitude: originLatitude.toString(),
    originLongitude: originLongitude.toString(),
    destinationLatitude: destinationLatitude.toString(),
    destinationLongitude: destinationLongitude.toString(),
  });

  const base = API_URL || "";
  const res = await fetch(`${base}/api/locations/route?${params.toString()}`, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse<RouteDto>(res);
}

