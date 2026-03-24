import { Routes, Route } from "react-router-dom"
import { Login } from "./pages/Login/Login"
import { Register } from "./pages/Register/Register"
import { Viewport } from "./pages/Viewport/Viewport"
import { CreateOrder } from "./pages/CreateOrder/CreateOrder"
import { CreateUser } from "./pages/CreateUser/CreateUser"
import { Menu } from "./pages/Menu/Menu"
import { ViewOrders } from "./pages/ViewOrders/ViewOrders"

function App() {
  
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Viewport/>} />
      <Route path="/create-order" element={<CreateOrder/>} />
      <Route path="/create-user" element={<CreateUser/>} />
      <Route path="/menu" element={<Menu/>} />
      <Route path="/view-orders" element={<ViewOrders/>} />
    </Routes>
  )
}

export default App
