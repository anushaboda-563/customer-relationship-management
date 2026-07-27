import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Deals from "./pages/Deals";
import Interactions from "./pages/Interactions";
import Documents from "./pages/Documents";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import DealPipeline from "./pages/DealPipeline";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/forgot-password" element={<ForgotPassword />} />


                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/leads"
                    element={
                        <ProtectedRoute>
                            <Leads />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/deals"
                    element={
                        <ProtectedRoute>
                            <Deals />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/interactions"
                    element={
                        <ProtectedRoute>
                            <Interactions />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/documents"
                    element={
                        <ProtectedRoute>
                            <Documents />
                        </ProtectedRoute>
                    }
                />
                <Route path="/users" element={<Users />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/change-password"
                    element={
                        <ProtectedRoute>
                            <ChangePassword />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/pipeline"
                    element={
                        <ProtectedRoute>
                            <DealPipeline />
                        </ProtectedRoute>
                    }
                />
                

            </Routes>
        </BrowserRouter>
    );
}

export default App;