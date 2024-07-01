import React from "react";
import AddTodo from "./AddTodo";
import Todos from "./Todos";
import WelcomeMessage from "./WelcomeMessage";

function TodoApp() {
    return (
        <React.Fragment>
            <WelcomeMessage />
            <AddTodo />
            <Todos />
        </React.Fragment>
    );
}

export default TodoApp;
