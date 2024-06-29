import { useQuery } from "@tanstack/react-query";
import { getUserTodos } from "../../api/todos";
import { TodosResponse } from "../../types/todos";

export function useTodos() {
    const { data, isLoading, error } = useQuery<TodosResponse, Error>({
        queryKey: ["todos"],
        queryFn: getUserTodos,
    });

    return {
        todos: data?.data.todos,
        result: data?.results,
        isLoading,
        error,
    };
}
