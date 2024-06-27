import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../api/auth";
import { AuthResponse, Signup } from "../../types/auth";
import { useNavigate } from "react-router-dom";

export function useSignup() {
    const navigate = useNavigate();
    const {
        mutate: signup,
        isPending: isSigningUp,
        error,
    } = useMutation<AuthResponse, Error, Signup>({
        mutationFn: signupApi,
        onSuccess: () => {
            console.log("Signed up successfully");
            navigate("/");
        },
        onError: (error) => {
            console.error(error);
        },
    });

    return { signup, isSigningUp, error };
}
