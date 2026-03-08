import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../types";
import { authClient } from "../lib/auth";
import { AuthContext } from "./authContextDef";

export default function AuthProvider( { children } : { children: ReactNode }) {
    const [neonUser, setNeonUser] = useState<User | null>(null);

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
                }
            }
            loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{user: neonUser}}> {children}</AuthContext.Provider>
    );
}


