import { LogOut } from "lucide-react";
import TodoApp from "./TodoApp";
import { useLogout } from "../hooks/auth/useLogout";

function AppLayout() {
    const { logout, isLoggingOut } = useLogout();

    return (
        <main className="p-1 sm:w-[26rem] w-full">
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
            <TodoApp />
        </main>
    );
}

export default AppLayout;
