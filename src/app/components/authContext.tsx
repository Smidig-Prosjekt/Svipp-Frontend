'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../lib/types/user";
import { sessionRequest } from "../lib/api";

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    setUser: (user: User) => void;
    retrySession: () => void;
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
    const [error, setError] = useState<string | null>(null);

    console.log("user", user);
    
    const fetchSession = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await sessionRequest();
            setUser(response);
            setError(null);
        } catch (err: any) {
            // Middleware har allerede validert token, så feilen er sannsynligvis
            // en midlertidig nettverksfeil eller API-problem
            setUser(null);
            setError(err.message || "Kunne ikke hente brukerdata. Prøv å oppdatere siden.");
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchSession();
    }, [])

    return(
        <AuthContext.Provider value={{ 
            user, 
            isLoading, 
            error,
            setUser,
            retrySession: fetchSession
        }}>
            {children}
        </AuthContext.Provider>
    )
}