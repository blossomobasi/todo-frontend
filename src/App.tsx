import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserProvider } from "./contexts/useUser";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoutes>
                                    <AppLayout />
                                </ProtectedRoutes>
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        <Route path="*" element={<h1>Not Found</h1>} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </QueryClientProvider>
    );
}

export default App;
