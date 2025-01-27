import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/auth/useUser";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const { isLoading, isAuthenticated } = useUser();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, [navigate, isLoading, isAuthenticated]);

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderCircle className="animate-spin" size={40} />
            </div>
        );

    if (isAuthenticated) return children;
}

export default ProtectedRoutes;
