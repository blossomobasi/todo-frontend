import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../../api/todos";

export function useDeleteTodo() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
        },
        onError: (err) => {
            console.error(err);
        },
    });

    return { deleteTodo: mutate, isDeleting: isPending };
}
