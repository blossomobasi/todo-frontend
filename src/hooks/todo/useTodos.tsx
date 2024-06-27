import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../api/todos";
import { TodoResponse } from "../../types/todos";

export function useTodos() {
    const { data, isLoading, error } = useQuery<TodoResponse, Error>({
        queryKey: ["todos"],
        queryFn: getTodos,
    });

    return {
        todos: data?.data.todos,
        result: data?.results,
        isLoading,
        error,
    };
}
