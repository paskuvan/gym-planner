import { useEffect, useState, useCallback, type ReactNode } from "react";
import type { User, UserProfile, TrainingPlan } from "../types";
import { authClient } from "../lib/auth";
import { api } from "../lib/api";
import { AuthContext } from "./authContextDef";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [neonUser, setNeonUser] = useState<User | null>(null);
    const [plan, setPlan] = useState<TrainingPlan | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshData = useCallback(async () => {
        if (!neonUser) return;
        try {
            const latestPlan = await api.getPlan(neonUser.id);
            setPlan(latestPlan);
        } catch {
            setPlan(null);
        }
    }, [neonUser]);

    useEffect(() => {
        async function loadUser() {
            try {
                const result = await authClient.getSession();
                if (result && result.data?.user) {
                    setNeonUser(result.data.user);
                } else {
                    setNeonUser(null);
                }
            } catch {
                setNeonUser(null);
            } finally {
                setIsLoading(false);
            }
        }
        loadUser();
    }, []);

    useEffect(() => {
        if (neonUser) {
            refreshData();
        }
    }, [neonUser, refreshData]);

    async function saveProfile(
        profileData: Omit<UserProfile, 'userId' | 'updatedAt'>
    ) {
        if (!neonUser) {
            throw new Error("User not authenticated");
        }
        await api.saveProfile(neonUser.id, profileData);
    }

    async function generatePlan() {
        if (!neonUser) {
            throw new Error("User must be authenticated to generate plan");
        }
        await api.generatePlan(neonUser.id);
        await refreshData();
    }

    return (
        <AuthContext.Provider
            value={{ user: neonUser, plan, isLoading, saveProfile, generatePlan, refreshData }}>
            {children}
        </AuthContext.Provider>
    );
}



