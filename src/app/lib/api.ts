// For lokal utvikling går alle kall via Next.js sitt eget domene (localhost:3000),
// og proxes videre til backend via rewrites i next.config.ts.
// I prod kan du evt. sette NEXT_PUBLIC_API_URL hvis API-et ligger på et annet domene.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

async function handleResponse<T>(res: Response): Promise<T> {
  const data = (await res.json().catch(() => ({}))) as any;

  if (!res.ok) {
    throw new Error(data?.message ?? "Noe gikk galt mot API-et");
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


