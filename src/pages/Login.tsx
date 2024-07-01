import React from "react";
import { useLogin } from "../hooks/auth/useLogin";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { LoaderCircle } from "lucide-react";

import AuthLayout from "../components/AuthLayout";

function Login() {
    const { login, isLoggingIn } = useLogin();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        login({ email, password });
    }

    return (
        <AuthLayout>
            <h1 className="text-center mb-7 mt-20 text-2xl">Login</h1>
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
                    {isLoggingIn ? (
                        <LoaderCircle className="animate-spin" size={20} color="#fff" />
                    ) : (
                        "Login"
                    )}
                </Button>
            </form>
        </AuthLayout>
    );
}

export default Login;
