import React from "react";
import { login } from "../api/auth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { AuthResponse } from "../types/auth";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res: AuthResponse = await login({ email, password });

        if (res.status === "success") {
            console.log("Logged in successfully");
            navigate("/");
        }
    }

    return (
        <div className="w-[22rem] mt-28">
            <h1 className="text-center my-5 text-2xl">Login</h1>
            <form className="flex flex-col space-y-5" onSubmit={handleLogin}>
                <Input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit" className="bg-[#9e78cf] hover:bg-[#3e1671]">
                    Login
                </Button>
            </form>
        </div>
    );
}

export default Login;
