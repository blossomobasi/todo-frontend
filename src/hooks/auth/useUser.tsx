import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/auth";
import { UserResponse } from "../../types/user";

export function useUser() {
    const { data, isLoading, error } = useQuery<UserResponse, Error>({
        queryKey: ["user"],
        queryFn: getMe,
    });

    return {
        user: data?.data.user,
        isAuthenticated: data?.data.user.role.includes("user"),
        isLoading,
        error,
    };
}
