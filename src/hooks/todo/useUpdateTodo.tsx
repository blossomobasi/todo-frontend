import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo as updateTodoApi } from "../../api/todos";
import { TodoResponse, UpdateTodoInput } from "../../types/todos";
import { useToast } from "../../components/ui/use-toast";

export function useUpdateTodo() {
    const { toast } = useToast();
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

            toast({
                title: "Task",
                description: "Successfully updated task",
            });
        },
        onError: (err) => {
            toast({
                title: "Task",
                description: err.message || "Failed to update task",
            });
        },
    });

    return { updateTodo, isUpdatingTodo };
}
