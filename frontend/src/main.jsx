import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Navbar } from "./layouts/Navbar/Navbar.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ThemeButton } from "./components/ThemeButton/ThemeButton.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <App />
          <ThemeButton />
        </CartProvider>
      </AuthProvider> 
    </ThemeProvider>
  </BrowserRouter>
);
