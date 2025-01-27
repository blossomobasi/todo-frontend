import { useQuery } from "@tanstack/react-query";
import { getUserTodos } from "../../api/todos";
import { TodosResponse } from "../../types/todos";
import { useUser } from "../auth/useUser";

export function useTodos() {
    const { user } = useUser();
    const { data, isLoading, error } = useQuery<TodosResponse, Error>({
        queryKey: ["todos", user?._id],
        queryFn: getUserTodos,
        enabled: !!user?._id,
    });

    return {
        todos: data?.data.todos,
        result: data?.results,
        isLoading,
        error,
    };
}
