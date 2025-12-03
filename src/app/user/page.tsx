/* 
    Ny brukerkonto-side
    Bruker eksisterende komponenter: Button, InputField, LeftArrowIconButton og GoogleIcon.
*/

"use client";

import { useState } from "react";
import Button from "../components/button";
import InputField from "../components/inputField";
import LeftArrowIconButton from "../components/leftArrowIconButton";
import GoogleIcon from "../icons/googleIcon";
import Link from "next/link";

export default function NewUserAccountPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementer opprett bruker-logikk
    console.log({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-blue-400 to-slate-50">
      <div className="w-full max-w-sm bg-transparent">
        <div className="mb-8">
          <LeftArrowIconButton />
        </div>

        <h1 className="text-2xl font-semibold text-center text-black mb-8">
          Ny brukerkonto
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <InputField
                title="Fornavn"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                title="Etternavn"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
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
              required
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
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-2 text-xs text-gray-500"
              >
                {showPassword ? "Skjul" : "Vis"}
              </button>
            </div>
            <p className="text-xs text-gray-600 pl-1">Minimum 8 tegn</p>
          </div>

          <div className="space-y-1">
            <div className="relative">
              <InputField
                title="Bekreft passord"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
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
              text="Opprett brukerkonto"
              bgColor="Primary"
              textColor="White"
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