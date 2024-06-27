import { useUser } from "../contexts/useUser";
import AddTodo from "./AddTodo";
import Todos from "./Todos";

function TodoApp() {
    const { user } = useUser();

    return (
        <div>
            <h1 className="text-2xl mt-14">Welcome, {user?.username}</h1>

            <AddTodo />
            <Todos />
        </div>
    );
}

export default TodoApp;
