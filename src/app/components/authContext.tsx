'use client'

import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../lib/types/user";
import { sessionRequest } from "../lib/api";

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuthSession() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("UseAuthSession must be used within a AuthContext Provider.");
    }
    return value;
}

export function AuthSessionProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    console.log("user", user);
    
    useEffect(() => {
        // Call the new `session` endpoint, if it doesn't fail, the user is authenticated, update
        async function attemptLogin() {
            try {
                const response = await sessionRequest();
                setUser(response);
            } catch (error) {
                router.push("/login");
            }
            setIsLoading(false);
        }
        attemptLogin();
    }, [])

    return(
        <AuthContext.Provider value={{ user: user, isLoading, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}