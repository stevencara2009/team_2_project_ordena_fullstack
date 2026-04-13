import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Navbar } from './layouts/Navbar/Navbar.jsx'
import { Footer } from './layouts/Footer/Footer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar/>
      <App  />

  </BrowserRouter>
)
