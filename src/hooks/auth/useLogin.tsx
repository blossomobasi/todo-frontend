import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../api/auth";
import { AuthResponse, Login } from "../../types/auth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const navigate = useNavigate();
    const {
        mutate: login,
        isPending: isLoggingIn,
        error,
    } = useMutation<AuthResponse, Error, Login>({
        mutationFn: loginApi,
        onSuccess: () => {
            console.log("Logged in successfully");
            navigate("/");
        },
        onError: (error) => {
            console.error(error);
        },
    });

    return { login, isLoggingIn, error };
}
