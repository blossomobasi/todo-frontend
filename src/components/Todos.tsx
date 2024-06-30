import { Bell, Check, ChevronDown, Trash } from "lucide-react";
import { dateFormatter } from "../utils";
import { useDeleteTodo } from "../hooks/todo/useDeleteTodo";
import { useUpdateTodo } from "../hooks/todo/useUpdateTodo";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useTodos } from "../hooks/todo/useTodos";

function Todos() {
    const { todos, isLoading: isLoadingTodos, result, error } = useTodos();
    const { toast } = useToast();
    const { deleteTodo, isDeleting } = useDeleteTodo();
    const { updateTodo } = useUpdateTodo();
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

    function handleCompleteTodo(todoId: string, currentStatus: boolean) {
        updateTodo({
            todoId,
            updateTodoInput: {
                completed: !currentStatus,
            },
        });
    }

    function handleUpdateTodo() {
        toast({
            title: "Update Task",
            description: "Feature not available yet",
        });
    }

    return (
        <div className="h-[calc(100vh-14rem)] overflow-y-auto py-3 space-y-3 rounded-md">
            <div className="text-[#78cfb0]  mb-3">Total Task &mdash; {result}</div>

            <div className="text-white mb-3">
                Uncompleted Task &mdash; {UNCOMPLETEDTASK?.length}
            </div>
            {UNCOMPLETEDTASK?.map(
                (todo) =>
                    !todo.completed && (
                        <div key={todo._id} className="bg-[#15101C] rounded-lg px-5 pt-5 pb-2 mb-3">
                            <div className="flex justify-between">
                                <p
                                    onClick={handleUpdateTodo}
                                    className={`w-3/4 truncate ${
                                        todo.completed && "text-[#78cfb0] line-through"
                                    }`}
                                    title={todo.description}
                                >
                                    {todo.description}
                                </p>
                                <span className="flex items-center space-x-2">
                                    <Check
                                        className="hover:text-[#3e1671] cursor-pointer"
                                        onClick={() => handleCompleteTodo(todo._id, todo.completed)}
                                    />
                                    <Trash
                                        className={`hover:text-[#3e1671] cursor-pointer ${
                                            isDeleting ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                        onClick={() => handleDeleteTodo(todo._id)}
                                    />
                                </span>
                            </div>

                            <div className="flex justify-between mt-1.5">
                                <span className="text-xs text-stone-700">
                                    {dateFormatter(todo.createdAt)}
                                </span>
                                {todo.reminder && (
                                    <span className="flex items-center text-xs text-stone-700">
                                        <Bell size={12} className="mr-2 text-purple-200" />
                                        {dateFormatter(todo.reminder)}
                                    </span>
                                )}
                            </div>
                        </div>
                    )
            )}

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

            {COMPLETEDTASK?.map(
                (todo) =>
                    todo.completed && (
                        <div
                            key={todo._id}
                            className={`bg-[#15101C] rounded-lg px-5 pt-5 pb-2 mb-3 ${
                                !openCompleted ? "hidden" : ""
                            }`}
                        >
                            <div className="flex justify-between">
                                <p
                                    className={`w-3/4 truncate ${
                                        todo.completed && "text-[#78cfb0] line-through"
                                    }`}
                                    title={todo.description}
                                >
                                    {todo.description}
                                </p>
                                <span className="flex items-center space-x-2">
                                    <Check
                                        className="hover:text-[#3e1671] cursor-pointer"
                                        onClick={() => handleCompleteTodo(todo._id, todo.completed)}
                                    />
                                    <Trash
                                        className={`hover:text-[#3e1671] cursor-pointer ${
                                            isDeleting ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                        onClick={() => handleDeleteTodo(todo._id)}
                                    />
                                </span>
                            </div>

                            <div className="flex justify-between mt-1.5">
                                <span className="text-xs text-stone-700">
                                    {dateFormatter(todo.createdAt)}
                                </span>
                                {todo.reminder && (
                                    <span className="flex items-center text-xs text-stone-700">
                                        <Bell size={12} className="mr-2 text-purple-200" />
                                        {dateFormatter(todo.reminder)}
                                    </span>
                                )}
                            </div>
                        </div>
                    )
            )}
        </div>
    );
}

export default Todos;
