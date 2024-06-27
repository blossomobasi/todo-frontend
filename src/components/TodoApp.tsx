import { useUser } from "../hooks/auth/useUser";
import AddTodo from "./AddTodo";
import Todos from "./Todos";

function TodoApp() {
    const { user } = useUser();

    return (
        <div>
            <h1 className="text-2xl mt-8 text-center">Welcome, {user?.username}</h1>

            <AddTodo />
            <Todos />
        </div>
    );
}

export default TodoApp;
