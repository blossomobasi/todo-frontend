import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useSignup } from "../hooks/auth/useSignup";

function Signup() {
    const { signup, isSigningUp } = useSignup();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        signup({ username, email, password });
    }

    return (
        <div className="w-[22rem] mt-28">
            <h1 className="text-center my-5 text-2xl">Signup</h1>
            <form className="flex flex-col space-y-5" onSubmit={handleSignup}>
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isSigningUp}
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSigningUp}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSigningUp}
                />

                <Button
                    type="submit"
                    disabled={isSigningUp}
                    className="bg-[#9e78cf] hover:bg-[#3e1671]"
                >
                    Signup
                </Button>
            </form>
        </div>
    );
}

export default Signup;
