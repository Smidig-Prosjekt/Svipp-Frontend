"use client";

import Button from "../components/button";
import InputField from "../components/inputField";
import GoogleIcon from "../icons/googleIcon";

export default function LoginPage() {
    return (
        <div className="w-screen h-screen p-8">
            <div className="flex flex-col items-center gap-8">
                <img src="/svipp.svg" alt="svipp logo" className="w-64 h-24"></img>
                <InputField title='E-post' onChange={() => console.log('Typing email...')} type='email' required placeholder="Skriv inn epost"></InputField>
                <InputField title='Passord' onChange={() => console.log('Typing password...')} type='password' required placeholder="*********"></InputField>
                <Button handleOnClick={() => console.log('Logging in...')} text='Logg inn' bgColor='Primary' textColor='White'></Button>
                <Button handleOnClick={() => console.log('Logging in with google...')} text='Logg inn med Google' bgColor='Light' textColor='Black' icon={<GoogleIcon />}></Button>
            </div>
        </div>
    )
}