import Nav from "./Nav";
import TodoApp from "./TodoApp";

function AppLayout() {
    return (
        <main className="p-1 sm:w-[26rem] w-full">
            <Nav />
            <TodoApp />
        </main>
    );
}

export default AppLayout;
