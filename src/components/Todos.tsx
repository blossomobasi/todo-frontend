import { Bell, Check, Trash } from "lucide-react";
import { dateFormatter } from "../utils";
import { useTodos } from "../hooks/todo/useTodos";

function Todos() {
    const { todos, isLoading, result, error } = useTodos();

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>Something went wrong...</p>;

    if (!todos?.length) return <p>No task available... Add a task</p>;

    return (
        <div className="h-[calc(100vh-14rem)] overflow-y-auto px-5 py-3 space-y-3 rounded-md">
            <div className="text-white mb-3">Task to do &mdash; {result}</div>

            {todos.map((todo) => (
                <div key={todo._id} className="bg-[#15101C] rounded-lg px-5 pt-5 pb-2 mb-3">
                    <div className="flex justify-between">
                        <p className=" w-3/4 truncate" title={todo.description}>
                            {todo.description}
                        </p>
                        <span className="flex items-center space-x-2">
                            <Check className="hover:text-[#3e1671] cursor-pointer" />
                            <Trash className="hover:text-[#3e1671] cursor-pointer" />
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
