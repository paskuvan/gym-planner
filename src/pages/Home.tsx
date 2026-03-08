import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Home() {
    const { user, isLoading } = useAuth();

    if(!isLoading && user) {
        return <Navigate to="/profile" replace />;
    }
    return (
        <div>Home Page</div>
    );
}