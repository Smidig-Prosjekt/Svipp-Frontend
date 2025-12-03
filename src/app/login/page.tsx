"use client";

import Link from "next/link";
import Button from "../components/button";
import InputField from "../components/inputField";
import GoogleIcon from "../icons/googleIcon";
import { useState } from "react";

// https://www.creative-tim.com/twcomponents/gradient-generator

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="h-screen flex justify-center bg-linear-to-b from-blue-400 to-slate-50">
            <div className="w-full flex flex-col justify-center items-center gap-8 max-w-sm">
                
                <img src="/svipp.svg" alt="svipp logo" className="w-64 h-24"></img>

                <InputField title='E-post' onChange={(e) => setEmail(e.target.value)} type='email' required value={email} placeholder="Skriv inn epost"></InputField>
                <InputField title='Passord' onChange={(e) => setPassword(e.target.value)} type='password' required value={password} placeholder="********"></InputField>
                
                <Button handleOnClick={() => console.log('Logging in...')} text='Logg inn' bgColor='Primary' textColor='White'></Button>
                <Button handleOnClick={() => console.log('Logging in with google...')} text='Logg inn med Google' bgColor='Light' textColor='Black' icon={<GoogleIcon />}></Button>

                <p className="mt-8 text-center text-sm text-gray-700">Ingen konto?{" "}
                    <Link href="/register" className="text-blue-700 underline">Registrer deg</Link>
                </p>
            </div>
        </div>
    )
}