import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserProvider } from "./contexts/useUser";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
    return (
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
    );
}

export default App;
