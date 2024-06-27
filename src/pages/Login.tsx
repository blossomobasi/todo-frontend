import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useLogin } from "../hooks/auth/useLogin";

function Login() {
    const { login, isLoggingIn } = useLogin();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        login({ email, password });
    }

    return (
        <div className="w-[22rem] mt-28">
            <h1 className="text-center my-5 text-2xl">Login</h1>
            <form className="flex flex-col space-y-5" onSubmit={handleLogin}>
                <Input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoggingIn}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoggingIn}
                />

                <Button
                    type="submit"
                    disabled={isLoggingIn}
                    className="bg-[#9e78cf] hover:bg-[#3e1671]"
                >
                    Login
                </Button>
            </form>
        </div>
    );
}

export default Login;
