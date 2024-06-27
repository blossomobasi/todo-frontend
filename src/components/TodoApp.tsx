import AddTodo from "./AddTodo";
import Todos from "./Todos";

function TodoApp() {
    return (
        <div>
            <h1 className="text-2xl text-center my-5">Welcome %User%</h1>

            <AddTodo />
            <Todos />
        </div>
    );
}

export default TodoApp;
