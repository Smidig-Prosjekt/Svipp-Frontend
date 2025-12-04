"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import Button from "../components/button";
import InputField from "../components/inputField";
import GoogleIcon from "../icons/googleIcon";
import { loginRequest } from "../lib/api";

// https://www.creative-tim.com/twcomponents/gradient-generator

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/user";

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    setError(null);
    setLoading(true);

    try {
      await loginRequest(email, password);
      router.push(redirect);
    } catch (err: any) {
      setError(err.message ?? "Innlogging feilet");
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
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Skriv inn e-post"
          />

          <InputField
            title="Passord"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />

          <Button
            handleOnClick={handleLogin}
            text={loading ? "Logger inn..." : "Logg inn"}
            bgColor="Primary"
            textColor="White"
            disabled={loading}
          />
        </form>

        <Button
          handleOnClick={() => console.log("Logging in with google...")}
          text="Logg inn med Google"
          bgColor="Light"
          textColor="Black"
          icon={<GoogleIcon />}
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