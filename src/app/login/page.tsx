"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      await loginRequest(email, password);
      router.push("/user");
    } catch (err: any) {
      setError(err.message ?? "Innlogging feilet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center bg-linear-to-b from-blue-400 to-slate-50">
      <div className="w-full flex flex-col justify-center items-center gap-8 max-w-sm">
        <img src="/svipp.svg" alt="svipp logo" className="w-64 h-24" />

        {error && (
          <p className="text-sm text-red-600 text-center px-2">{error}</p>
        )}

        <InputField
          title="E-post"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          value={email}
          placeholder="Skriv inn epost"
        />
        <InputField
          title="Passord"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          value={password}
          placeholder="********"
        />

        <Button
          handleOnClick={handleLogin}
          text={loading ? "Logger inn..." : "Logg inn"}
          bgColor="Primary"
          textColor="White"
        />

        <Button
          handleOnClick={() => console.log("Logging in with google...")}
          text="Logg inn med Google"
          bgColor="Light"
          textColor="Black"
          icon={<GoogleIcon />}
        />

        <p className="mt-8 text-center text-sm text-gray-700">
          Ingen konto?{" "}
          <Link href="/user" className="text-blue-700 underline">
            Registrer deg
          </Link>
        </p>
      </div>
    </div>
  );
}