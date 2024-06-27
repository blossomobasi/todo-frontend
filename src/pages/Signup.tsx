import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

function Signup() {
    function handleSignup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <div className="w-[22rem] mt-28">
            <h1 className="text-center my-5 text-2xl">Signup</h1>
            <form className="flex flex-col space-y-5" onSubmit={handleSignup}>
                <Input type="text" placeholder="Username" />
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />

                <Button type="submit" className="bg-[#9e78cf] hover:bg-[#3e1671]">
                    Signup
                </Button>
            </form>
        </div>
    );
}

export default Signup;
