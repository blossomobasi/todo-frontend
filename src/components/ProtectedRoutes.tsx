import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/useUser";
import { useEffect } from "react";

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const { isLoading, isAuthenticated } = useUser();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, [navigate, isLoading, isAuthenticated]);

    if (isLoading) return <div>Loading...</div>;

    if (isAuthenticated) return children;
}

export default ProtectedRoutes;
