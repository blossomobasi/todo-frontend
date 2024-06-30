import { LogOut } from "lucide-react";
import { useLogout } from "../hooks/auth/useLogout";

function Nav() {
    const { logout, isLoggingOut } = useLogout();

    return (
        <nav>
            <ul className="flex items-center justify-between my-5">
                <li>blossom.dev</li>
                <span title="logout">
                    <LogOut
                        className={`hover:text-[#3e1671] cursor-pointer ${
                            isLoggingOut && "cursor-not-allowed opacity-50"
                        }`}
                        onClick={() => logout()}
                    />
                </span>
            </ul>
        </nav>
    );
}

export default Nav;
