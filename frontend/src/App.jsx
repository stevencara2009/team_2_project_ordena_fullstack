import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Orders } from "./pages/Orders/Orders";
import { Users } from "./pages/Users/Users";
import { Products } from "./pages/Products/Products";
import { ViewOrders } from "./pages/ViewOrders/ViewOrders";
import { Index } from "./pages/Index/Index";
import { NotFound } from "./layouts/NotFound/NotFound";
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import { useEffect } from "react";
import { AdminLayout } from "./layouts/Admin/Admin";
import { Menu } from "./pages/Menu/Menu";
import { Bills } from "./pages/Bills/Bills";
import { Profile } from "./pages/Profile/Profile";
import { BillsHistory } from "./pages/BillHistory/BillsHistory";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";

function App() {
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);


  return (
    <>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/index" element={<Index />} />
        <Route path="/menu" element={<Menu />} />

        {/* Rutas protegidas */}
        <Route path="/" element={<AdminLayout />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR", "MESERO", "CAJERO"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="orders"
            element={
              <ProtectedRoute
                allowedRoles={["ADMINISTRADOR", "COCINERO", "MESERO", "CAJERO"]}
              >
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="products"
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="view-orders"
            element={
              <ProtectedRoute
                allowedRoles={["ADMINISTRADOR", "COCINERO", "MESERO", "CAJERO"]}
              >
                <ViewOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="bills"
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR", "CAJERO"]}>
                <Bills />
              </ProtectedRoute>
            }
          />

          <Route
            path="bills-history"
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR", "CAJERO"]}>
                <BillsHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="profile"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "ADMINISTRADOR",
                  "CLIENTE",
                  "COCINERO",
                  "MESERO",
                  "CAJERO",
                ]}
              >
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
        
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
