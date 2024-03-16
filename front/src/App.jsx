import Home from "./views/Home/Home";
import styles from "./App.module.css";
import Register from "./views/Register/Register";
import MisTurnos from "./views/MisTurnos/MisTurnos"
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route, Link, useLocation } from "react-router-dom"
import Login from "./views/Login/Login";
import MisTurnosUserDetail from "./views/MisTurnos/MisturnosUserDetail";
import Users from "./views/Users/Users";
import Personas from "./views/Personas/Personas";
import Empresas from "./views/Empresas/Empresas";
import Contact from "./views/Contact/Contact";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  // path actual de user
  const location = useLocation();
  return (
    <div className= {styles.body}>
      {location.pathname !== "/login" && <NavBar />}      
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path="/productsempresas" element={<Empresas />} />
        <Route path="/personas" element={<Personas />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/users/register" element={<Register />} />
        <Route path="/users" element= {<Users />} />
        <Route path = "/appointments" element={<MisTurnos />} />
        <Route path="/users/:id" element= {<MisTurnosUserDetail />} />
        <Route path="/contact" element= {<Contact />} />
        <Route path="*" element= {<ErrorPage />} />
      </Routes>      
    </div>
  )
}

export default App
