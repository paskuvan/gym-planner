import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Profile() {
    const { user, isLoading, plan } = useAuth();

    if(!user && !isLoading) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    if(!plan) {
        // change if you want to show onboarding instead of redirecting to onboarding
        return <Navigate to="/profile" replace />;
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Your training plan</h1>
                        <p className="text-[var(--color-muted)]">Version {plan.version} - Created</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
