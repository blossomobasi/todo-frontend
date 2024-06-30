import { Login, Signup } from "../types/auth";

export async function login(credentials: Login) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // This is required for cookies to be sent
        body: JSON.stringify(credentials),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to login");
    }

    return res.json();
}

export async function signup(credentials: Signup) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // This is required for cookies to be sent
        body: JSON.stringify(credentials),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to signup");
    }

    return res.json();
}

export async function getMe() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/users/me`, {
        credentials: "include",
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to get user");
    }

    return res.json();
}
