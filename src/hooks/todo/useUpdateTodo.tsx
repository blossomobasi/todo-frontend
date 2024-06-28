import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo as updateTodoApi } from "../../api/todos";
import { TodoResponse, UpdateTodoInput } from "../../types/todos";

export function useUpdateTodo() {
    const queryClient = useQueryClient();
    const { mutate: updateTodo, isPending: isUpdatingTodo } = useMutation<
        TodoResponse,
        Error,
        // todoId and updateTodoInput are required as two parameters
        { todoId: string; updateTodoInput: UpdateTodoInput }
    >({
        mutationFn: ({ todoId, updateTodoInput }) => updateTodoApi(todoId, updateTodoInput),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
        },
        onError: (err) => {
            console.error(err);
        },
    });

    return { updateTodo, isUpdatingTodo };
}
