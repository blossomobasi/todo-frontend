import { useEffect, useState } from "react";
import { getTodos } from "../api/todos";
import { Todo } from "../types/todos";
import { Check, Trash } from "lucide-react";
import { dateFormatter } from "../utils";

function Todos() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [todos, setTodos] = useState<Todo[] | null>(null);

    useEffect(() => {
        async function fetchTodos() {
            try {
                setIsLoading(true);
                const res = await getTodos();
                setTodos(res.data.todos);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTodos();
    }, []);

    if (isLoading) return <p>Loading...</p>;

    if (!todos?.length) return <p>No task available... Add a task</p>;

    return (
        <div>
            <div className="text-white mb-3">Task to do &mdash; {todos.length}</div>

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

                    <span className="text-xs text-stone-700">{dateFormatter(todo.createdAt)}</span>
                </div>
            ))}
        </div>
    );
}

export default Todos;
