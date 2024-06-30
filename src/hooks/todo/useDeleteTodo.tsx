import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../../api/todos";
import { useToast } from "../../components/ui/use-toast";

export function useDeleteTodo() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });

            toast({
                title: "Task",
                description: "Task was successfully deleted",
            });
        },
        onError: (err) => {
            toast({
                title: "Task",
                description: err.message || "Failed to delete task",
            });
        },
    });

    return { deleteTodo: mutate, isDeleting: isPending };
}
