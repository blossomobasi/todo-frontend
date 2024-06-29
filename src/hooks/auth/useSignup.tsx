import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../api/auth";
import { AuthResponse, Signup } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/ui/use-toast";

export function useSignup() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const {
        mutate: signup,
        isPending: isSigningUp,
        error,
    } = useMutation<AuthResponse, Error, Signup>({
        mutationFn: signupApi,
        onSuccess: () => {
            toast({
                title: "Signup Success",
                description: "Signed up successfully",
            });
            navigate("/");
        },
        onError: (error) => {
            toast({
                title: "Signup Failed",
                description: error.message,
            });
        },
    });

    return { signup, isSigningUp, error };
}
