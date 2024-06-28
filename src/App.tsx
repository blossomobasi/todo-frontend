import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DateProvider } from "./context/DateContext";
import { Toaster } from "./components/ui/toaster";

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
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />

            <DateProvider>
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
            </DateProvider>
        </QueryClientProvider>
    );
}

export default App;
