import { Bell, Check, Trash } from "lucide-react";
import { dateFormatter } from "../utils";
import { Todo } from "../types/todos";

type DisplayTodoProps = {
    todos: Todo[] | undefined;
    onDelete: (id: string) => void;
    onComplete: (id: string, status: boolean) => void;
    onUpdate: () => void;
    isLoading: boolean;
};

function DisplayTodo({ todos, onDelete, onComplete, onUpdate, isLoading }: DisplayTodoProps) {
    return (
        <div>
            {todos?.map((todo) => (
                <div key={todo._id} className="bg-[#15101C] rounded-lg px-5 pt-5 pb-2 mb-3">
                    <div className="flex justify-between">
                        <p
                            onClick={onUpdate}
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
                                onClick={() => onComplete(todo._id, todo.completed)}
                            />
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
                </div>
            ))}
        </div>
    );
}

export default DisplayTodo;
