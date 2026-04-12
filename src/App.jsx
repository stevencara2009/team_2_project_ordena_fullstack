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

function App() {

  return (
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/view-orders" element={<ViewOrders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default App
