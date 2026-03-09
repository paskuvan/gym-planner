import { createContext } from "react";
import type { User, UserProfile } from "../types";

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    saveProfile: (profile: Omit<UserProfile, 'userId' | 'updatedAt'>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
