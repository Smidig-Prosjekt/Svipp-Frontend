"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import Button from "../components/button";
import InputField from "../components/inputField";
import GoogleIcon from "../components/icons/googleIcon";
import { loginRequest } from "../lib/api";
import { useAuthSession } from "../components/authContext";
import { loginSchema } from "../lib/validation";
import { z } from "zod";

// https://www.creative-tim.com/twcomponents/gradient-generator

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [redirect, setRedirect] = useState("/user"); // Default fallback

  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuthSession();

  // Validate redirect parameter to prevent open redirect attacks
  // This must run on the client side only (useEffect) since it accesses window
  useEffect(() => {
    const redirectParam = searchParams.get("redirect") || "/user";
    let validatedRedirect = "/user"; // Default fallback

    if (redirectParam && typeof window !== "undefined") {
      try {
        // Parse as URL to validate it's a safe relative path
        const url = new URL(redirectParam, window.location.origin);

        // Only allow redirects to same origin
        if (url.origin === window.location.origin) {
          // Additional check: ensure pathname starts with / and doesn't contain backslashes
          const pathname = url.pathname;
          if (pathname.startsWith("/") && !pathname.includes("\\")) {
            validatedRedirect = pathname + url.search + url.hash;
          }
        }
      } catch {
        // Invalid URL, use default
        validatedRedirect = "/user";
      }
    }

    setRedirect(validatedRedirect);
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // Validate form data with Zod
    const formData = {
      email,
      password,
    };

    try {
      const validatedData = loginSchema.parse(formData);

      setLoading(true);
      const response = await loginRequest(validatedData.email, validatedData.password);
      // Oppdater AuthContext med brukeren
      if (response.user) {
        setUser(response.user);
      }
      router.push(redirect);
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Map Zod validation errors to field errors
        const errors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            errors[error.path[0].toString()] = error.message;
          }
        });
        setFieldErrors(errors);
      } else if (err instanceof Error) {
        setError(err.message ?? "Innlogging feilet");
      } else {
        setError("Innlogging feilet");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center bg-linear-to-b from-blue-400 to-slate-50">
      <div className="w-full flex flex-col justify-center items-center gap-4 max-w-sm">
        <img src="/svipp.svg" alt="svipp logo" className="w-64 h-24" />

        {error && (
          <p className="text-red-600 text-sm text-center max-w-xs">{error}</p>
        )}

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <InputField
            title="E-post"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Skriv inn e-post"
            error={fieldErrors.email}
            name="email"
          />

          <InputField
            title="Passord"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            error={fieldErrors.password}
            name="password"
          />

          <Button
            text={loading ? "Logger inn..." : "Logg inn"}
            bgColor="Primary"
            textColor="White"
            disabled={loading}
            type="submit"
          />
        </form>

        <Button
          handleOnClick={() => console.log("Logging in with google...")}
          text="Logg inn med Google"
          bgColor="Light"
          textColor="Black"
          icon={<GoogleIcon />}
          type="button"
        />

        <p className="mt-4 text-center text-sm text-gray-700">
          Ingen konto?{" "}
          <Link href="/register" className="text-blue-700 underline">
            Registrer deg
          </Link>
        </p>
      </div>
    </div>
  );
}