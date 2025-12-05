/*
    Ny brukerkonto-side
    Bruker eksisterende komponenter: Button, InputField, LeftArrowIconButton og GoogleIcon.
*/

"use client";

import { useState } from "react";
import Button from "../components/button";
import InputField from "../components/inputField";
import LeftArrowIconButton from "../components/leftArrowIconButton";
import GoogleIcon from "../components/icons/googleIcon";
import Link from "next/link";
import { registerRequest } from "../lib/api";
import { useRouter } from "next/navigation";
import { registerSchema } from "../lib/validation";
import { z } from "zod";

export default function NewUserAccountPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // Validate form data with Zod
    const formData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    };

    try {
      const validatedData = registerSchema.parse(formData);

      setLoading(true);
      await registerRequest(
        validatedData.firstName,
        validatedData.lastName,
        validatedData.email,
        validatedData.phoneNumber,
        validatedData.password
      );
      router.push("/login");
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
        setError(err.message ?? "Registrering feilet");
      } else {
        setError("Registrering feilet");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-blue-400 to-slate-50">
      <div className="w-full max-w-sm bg-transparent">
        <div className="mb-8">
          <LeftArrowIconButton />
        </div>

        <h1 className="text-2xl font-semibold text-center text-black mb-4">
          Ny brukerkonto
        </h1>

        {error && (
          <p className="mb-4 text-center text-sm text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <InputField
                title="Fornavn"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={fieldErrors.firstName}
                name="firstName"
              />
            </div>
            <div className="flex-1">
              <InputField
                title="Etternavn"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={fieldErrors.lastName}
                name="lastName"
              />
            </div>
          </div>

          <div>
            <InputField
              title="E-post"
              type="email"
              placeholder="din@epost.no"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={fieldErrors.email}
              name="email"
            />
          </div>

          <div>
            <InputField
              title="Telefonnummer"
              type="tel"
              placeholder="12345678 eller +4712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={fieldErrors.phoneNumber}
              name="phoneNumber"
            />
          </div>

          <div className="space-y-1">
            <div className="relative">
              <InputField
                title="Passord"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={fieldErrors.password}
                name="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-2 text-xs text-gray-500"
              >
                {showPassword ? "Skjul" : "Vis"}
              </button>
            </div>
            {!fieldErrors.password && (
              <p className="text-xs text-gray-600 pl-1">
                Minimum 8 tegn, inkl. stor bokstav, liten bokstav og tall
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <InputField
                title="Bekreft passord"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={fieldErrors.confirmPassword}
                name="confirmPassword"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 bottom-2 text-xs text-gray-500"
              >
                {showConfirmPassword ? "Skjul" : "Vis"}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <Button
              handleOnClick={() => {}}
              text={loading ? "Oppretter..." : "Opprett brukerkonto"}
              bgColor="Primary"
              textColor="White"
              disabled={loading}
            />
          </div>

          <div>
            <Button
              handleOnClick={() => {}}
              text="Fortsett med Google"
              bgColor="Light"
              textColor="Black"
              icon={<GoogleIcon />}
            />
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-700">
          Allerede bruker?{" "}
          <Link href="/login" className="text-blue-700 underline">
            Logg inn
          </Link>
        </p>
      </div>
    </div>
  );
}