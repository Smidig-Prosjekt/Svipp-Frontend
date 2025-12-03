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
  const data = (await res.json().catch(() => ({}))) as ApiErrorPayload | any;

  if (!res.ok) {
    throw new Error(extractErrorMessage(data));
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


