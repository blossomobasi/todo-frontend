import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo as createTodoApi } from "../../api/todos";
import { TodoInput, TodoResponse } from "../../types/todos";

export function useCreateTodo() {
    const queryClient = useQueryClient();
    const { mutate: createTodo, isPending: isCreatingTodo } = useMutation<
        TodoResponse,
        Error,
        TodoInput
    >({
        mutationFn: createTodoApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });

            console.log("Todo created successfully");
            navigator.vibrate(200); // Vibrate the device
        },
        onError: (error) => {
            console.error(error);
        },
    });

    return { createTodo, isCreatingTodo };
}
