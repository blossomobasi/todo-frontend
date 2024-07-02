import { Bell, Check, LoaderCircle, Trash } from "lucide-react";
import { dateFormatter } from "../utils";
import { Todo } from "../types/todos";
import { useState } from "react";
import { UpdateTodo } from "./UpdateTodo";
import { useUpdateTodo } from "../hooks/todo/useUpdateTodo";

type DisplayTodoProps = {
    todos: Todo[] | undefined;
    onDelete: (id: string) => void;
    isLoading: boolean;
};

function DisplayTodo({ todos, onDelete, isLoading }: DisplayTodoProps) {
    const [openUpdateTodo, setOpenUpdateTodo] = useState<string | null>(null);
    const { isUpdatingTodo, updateTodo } = useUpdateTodo();
    const [currentTodoId, setCurrentTodoId] = useState<string | null>(null);

    function handleUpdateTodo(todoId: string, todo: Todo) {
        setCurrentTodoId(todoId);

        updateTodo({
            todoId,
            updateTodoInput: {
                completed: !todo.completed,
            },
        });
    }

    return (
        <div>
            {todos?.map((todo) => (
                <div key={todo._id} className="bg-[#15101C] rounded-lg px-5 pt-5 pb-2 mb-3">
                    {openUpdateTodo === todo._id ? (
                        <UpdateTodo
                            currentTodoId={todo._id}
                            todo={todo}
                            setOpenUpdateTodo={setOpenUpdateTodo}
                        />
                    ) : (
                        <>
                            <div className="flex justify-between">
                                <p
                                    onClick={() => setOpenUpdateTodo(todo._id)}
                                    className={`truncate cursor-pointer w-fit ${
                                        todo.completed && "text-[#78cfb0] line-through"
                                    }`}
                                    title={todo.description}
                                >
                                    {todo.description}
                                </p>
                                <span className="flex items-center space-x-2">
                                    {currentTodoId === todo._id && isUpdatingTodo ? (
                                        <LoaderCircle className="animate-spin" />
                                    ) : (
                                        <Check
                                            className="hover:text-[#3e1671] cursor-pointer"
                                            onClick={() => handleUpdateTodo(todo._id, todo)}
                                        />
                                    )}
                                    <Trash
                                        className={`hover:text-[#3e1671] cursor-pointer ${
                                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                        onClick={() => onDelete(todo._id)}
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
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default DisplayTodo;
