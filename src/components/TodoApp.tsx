import { useUser } from "../hooks/auth/useUser";
import AddTodo from "./AddTodo";
import Todos from "./Todos";

function TodoApp() {
    const { user } = useUser();

    return (
        <div>
            <h1 className="text-2xl mt-5 capitalize ml-5">
                Welcome {user?.username},
                <br />
                What is you task for today?
            </h1>

            <AddTodo />
            <Todos />
        </div>
    );
}

export default TodoApp;
