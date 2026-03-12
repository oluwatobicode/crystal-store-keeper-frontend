import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Sales from "./Pages/Sales";
import Customers from "./Pages/Customers";
import Payments from "./Pages/Payments";
import Reports from "./Pages/Reports";
import Settings from "./Pages/Settings";
import UserRoles from "./Pages/UserRoles";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import AppLayout from "./ui/AppLayout";
import Products from "./Pages/Products";
import Suppliers from "./Pages/Suppliers";
import VerifyEmail from "./Pages/VerifyEmail";
import ResetPassword from "./Pages/ResetPassword";
import SignUp from "./Pages/SignUp";
import VerifyOTP from "./Pages/VerifyOTP";
import { AuthProvider } from "./contexts/AuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Toaster
            toastOptions={{
              duration: 3000,
              removeDelay: 1000,
            }}
            position="top-right"
          />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />

              <Route
                path="/sales"
                element={
                  <ProtectedRoutes requiredPermission="pos.operate">
                    <Sales />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/products"
                element={
                  <ProtectedRoutes requiredPermission="inventory.view">
                    <Products />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/suppliers"
                element={
                  <ProtectedRoutes requiredPermission="inventory.manage">
                    <Suppliers />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/customers"
                element={
                  <ProtectedRoutes requiredPermission="customers.view">
                    <Customers />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/transactions"
                element={
                  <ProtectedRoutes requiredPermission="transactions.view">
                    <Payments />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/reports"
                element={
                  <ProtectedRoutes requiredPermission="reports.view">
                    <Reports />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoutes requiredPermission="settings.manage">
                    <Settings />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/UserRoles"
                element={
                  <ProtectedRoutes requiredPermission="users.manage">
                    <UserRoles />
                  </ProtectedRoutes>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
