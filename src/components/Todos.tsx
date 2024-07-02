import { ChevronDown } from "lucide-react";
import { useDeleteTodo } from "../hooks/todo/useDeleteTodo";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useTodos } from "../hooks/todo/useTodos";
import DisplayTodo from "./DisplayTodo";

function Todos() {
    const { todos, isLoading: isLoadingTodos, result, error } = useTodos();
    const { toast } = useToast();
    const { deleteTodo, isDeleting } = useDeleteTodo();
    const [openCompleted, setOpenCompleted] = useState(true);

    const UNCOMPLETEDTASK = todos?.filter((todo) => !todo.completed);
    const COMPLETEDTASK = todos?.filter((todo) => todo.completed);

    if (isLoadingTodos) return <p>Loading...</p>;

    if (error) return <p>{error.message || "Something went wrong"}</p>;

    if (!todos?.length) return <p>No task available... Add a task</p>;

    function handleDeleteTodo(id: string) {
        toast({
            title: "Task",
            description: "Are you sure?",
            action: (
                <ToastAction altText="delete task" onClick={() => deleteTodo(id)}>
                    Delete
                </ToastAction>
            ),
        });
    }

    return (
        <div className="h-[calc(100vh-14rem)] overflow-y-auto py-3 space-y-3 rounded-md">
            <div className="text-[#78cfb0]  mb-3">Total Task &mdash; {result}</div>

            {UNCOMPLETEDTASK?.length ? (
                <div className="text-white mb-3">
                    Uncompleted Task &mdash; {UNCOMPLETEDTASK?.length}
                </div>
            ) : (
                ""
            )}

            <DisplayTodo
                todos={UNCOMPLETEDTASK}
                isLoading={isDeleting}
                onDelete={handleDeleteTodo}
            />

            {/* COMPLETED TASK */}
            {COMPLETEDTASK?.length ? (
                <div
                    className="text-white mb-3 pt-5 flex items-center space-x-2 cursor-pointer"
                    onClick={() => setOpenCompleted(!openCompleted)}
                >
                    <span>
                        <ChevronDown
                            className={`${
                                openCompleted ? "rotate-180" : "rotate-0"
                            } transition-transform duration-300`}
                        />
                    </span>
                    <p>
                        Completed Task &mdash;
                        {COMPLETEDTASK?.length}
                    </p>
                </div>
            ) : (
                ""
            )}

            {COMPLETEDTASK?.length
                ? openCompleted && (
                      <DisplayTodo
                          todos={COMPLETEDTASK}
                          isLoading={isDeleting}
                          onDelete={handleDeleteTodo}
                      />
                  )
                : ""}
        </div>
    );
}

export default Todos;
