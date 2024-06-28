import { Bell, Check, Trash } from "lucide-react";
import { dateFormatter } from "../utils";
import { useTodos } from "../hooks/todo/useTodos";
import { useDeleteTodo } from "../hooks/todo/useDeleteTodo";
import { useState } from "react";
import { useUpdateTodo } from "../hooks/todo/useUpdateTodo";

function Todos() {
    const { todos, isLoading, result, error } = useTodos();
    const { deleteTodo, isDeleting } = useDeleteTodo();
    const { updateTodo, isUpdatingTodo } = useUpdateTodo();

    const [completed, setCompleted] = useState(false);

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>Something went wrong...</p>;

    if (!todos?.length) return <p>No task available... Add a task</p>;

    function handleDeleteTodo(id: string) {
        deleteTodo(id);
    }

    function handleCompleteTodo(todoId: string, currentStatus: boolean) {
        updateTodo({
            todoId,
            updateTodoInput: {
                completed: !currentStatus,
            },
        });

        setCompleted(!completed);
    }

    return (
        <div className="h-[calc(100vh-14rem)] overflow-y-auto px-5 py-3 space-y-3 rounded-md">
            <div className="text-white mb-3">Task to do &mdash; {result}</div>

            {todos.map((todo) => (
                <div key={todo._id} className="bg-[#15101C] rounded-lg px-5 pt-5 pb-2 mb-3">
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
            ))}
        </div>
    );
}

export default Todos;
