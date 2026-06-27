import { createContext } from "react";
import type { User } from "../types/User";
import { useState } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {

    const storedUser = localStorage.getItem("user");

    const [user, setUser] = useState<User | null>(storedUser ? JSON.parse(storedUser) : null);

    

    const login = (user:User) => { setUser(user)}
    
    const logout = () => { setUser(null); localStorage.removeItem("user"); }

    return (
    <AuthContext.Provider value={{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
);

}


