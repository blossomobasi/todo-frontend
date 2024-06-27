import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/user";

interface UserContextType {
    isLoading: boolean;
    user: User | undefined;
    setUser: (user: User | undefined) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                setIsLoading(true);
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/users/me`,
                    {
                        credentials: "include",
                    }
                );
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    });

    return (
        <UserContext.Provider value={{ user, setUser, isLoading }}>{children}</UserContext.Provider>
    );
}

function useUser() {
    const context = useContext(UserContext);

    if (context === undefined) throw new Error("useUser must be used within a UserProvider");

    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { UserProvider, useUser };
