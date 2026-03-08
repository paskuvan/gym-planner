import { createContext } from "react";
import type { User } from "../types";

interface AuthContextType {
    user: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider( {
    
})