import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../api/auth";
import { AuthResponse, Login } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/ui/use-toast";

export function useLogin() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const {
        mutate: login,
        isPending: isLoggingIn,
        error,
    } = useMutation<AuthResponse, Error, Login>({
        mutationFn: loginApi,
        onSuccess: () => {
            toast({
                title: "Login Success",
                description: "Successfully Logged In",
            });

            navigate("/");
        },
        onError: (error) => {
            toast({
                title: "Login Failed",
                description: error.message,
            });
        },
    });

    return { login, isLoggingIn, error };
}
