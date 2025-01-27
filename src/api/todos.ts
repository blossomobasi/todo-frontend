import { TodoInput, UpdateTodoInput } from "../types/todos";

export async function getTodos() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/todos`);

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch todos");
    }

    return res.json();
}

export async function getUserTodos() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/todos/mytodos`, {
        credentials: "include", // This is required for cookies to be sent
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch user todos");
    }

    return res.json();
}

export async function createTodo(todo: TodoInput) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // This is required for cookies to be sent
        body: JSON.stringify(todo),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create todo");
    }

    return res.json();
}

export async function updateTodo(id: string, todo: UpdateTodoInput) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // This is required for cookies to be sent
        body: JSON.stringify(todo),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update todo");
    }

    return res.json();
}

export async function deleteTodo(id: string) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/todos/${id}`, {
        method: "DELETE",
        credentials: "include", // This is required for cookies to be sent
    });

    if (res.status === 204) {
        return {};
    }

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete todo");
    }

    return res.json();
}
