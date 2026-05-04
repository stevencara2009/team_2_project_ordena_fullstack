import { Routes, Route } from "react-router-dom"
import { Login } from "./pages/Login/Login"
import { Register } from "./pages/Register/Register"
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { Orders } from "./pages/Orders/Orders"
import { Users } from "./pages/Users/Users"
import { Products } from "./pages/Products/Products"
import { ViewOrders } from "./pages/ViewOrders/ViewOrders"
import { Index } from "./pages/Index/Index"
import { NotFound } from "./layouts/NotFound/NotFound"
import { useAuth } from "./hooks/useAuth"
import { ProtectedRoute } from "./routes/ProtectedRoutes"
import { useEffect } from "react"
import { AdminLayout } from "./layouts/Admin/Admin"
import { Menu } from "./pages/Menu/Menu"

function App() {
  const { user } = useAuth()

  useEffect(() => {
    console.log(user)
  }, [user])

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

          <Route path="dashboard" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
          />

          <Route path="orders" element={
            <ProtectedRoute allowedRoles={["admin", "cocinero", "mesero"]}>
              <Orders />
            </ProtectedRoute>
          }
          />

          <Route path="users" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Users />
            </ProtectedRoute>
          }
          />

          <Route path="products" element={
            <ProtectedRoute allowedRoles={["admin", "cocinero", "mesero"]}>
              <Products />
            </ProtectedRoute>
          }
          />


          <Route path="view-orders" element={
            <ProtectedRoute allowedRoles={["admin", "cocinero", "mesero"]}>
              <ViewOrders />
            </ProtectedRoute>
          }
          />


        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes >

    </>
  )
}

export default App
