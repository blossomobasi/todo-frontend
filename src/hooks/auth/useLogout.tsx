import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../../components/ui/use-toast";

export function useLogout() {
    const queryClient = useQueryClient();
    const { mutate: logout, isPending: isLoggingOut } = useMutation({
        mutationFn: async function logout() {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/users/logout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // This is required for cookies to be sent
                }
            );

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Failed to logout");
            }

            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });

            toast({
                title: "Logout",
                description: "Successfully logged out",
            });
        },
        onError: (err) => {
            toast({
                title: "Logout",
                description: err.message || "Failed to logout",
            });
        },
    });

    return { logout, isLoggingOut };
}
