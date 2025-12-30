import { BrowserRouter, Route, Routes } from "react-router";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoutes>
              <AppLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/transactions" element={<Payments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/UserRoles" element={<UserRoles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
