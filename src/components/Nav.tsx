import { LogOut } from "lucide-react";
import { useLogout } from "../hooks/auth/useLogout";
import { useUser } from "../hooks/auth/useUser";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "./ui/use-toast";

function Nav() {
    const { logout, isLoggingOut } = useLogout();
    const { user } = useUser();
    const navigate = useNavigate();

    function handleLogout() {
        toast({
            title: "Logout",
            description: "Are you sure?",
            action: (
                <Button className="bg-[#3e1671] hover:bg-[#4d3967]" onClick={() => logout()}>
                    Logout
                </Button>
            ),
        });
    }

    return (
        <nav>
            <ul className="flex items-center justify-between my-5 border-b border-[#3e1671]/40 pb-2">
                <li className="cursor-pointer">blossom.dev</li>

                {user ? (
                    <span title="logout">
                        <LogOut
                            className={`hover:text-[#3e1671] cursor-pointer ${
                                isLoggingOut && "cursor-not-allowed opacity-50"
                            }`}
                            onClick={handleLogout}
                        />
                    </span>
                ) : (
                    <div className="flex space-x-3">
                        <Button
                            className="bg-transparent hover:bg-[#3e1671]"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                        <Button
                            className="bg-[#9e78cf] hover:bg-[#3e1671]"
                            onClick={() => navigate("/signup")}
                        >
                            Signup
                        </Button>
                    </div>
                )}
            </ul>
        </nav>
    );
}

export default Nav;
