import Home from "./views/Home/Home";
import styles from "./App.module.css";
import Register from "./views/Register/Register";
import Appointments from "./views/Appointments/Appointments"
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom"
import Login from "./views/Login/Login";
import AppointmentsUserDetail from "./views/Appointments/AppointmentsUserDetail";
import Users from "./views/Users/Users";
import Personas from "./views/Personas/Personas";
import Empresas from "./views/Empresas/Empresas";
import Contact from "./views/Contact/Contact";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import NewAppointment from "./views/Appointments/NewAppointment";
import Container from "react-bootstrap/esm/Container";
import Footer from "./components/Footer/Footer";

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
        <Route path = "/appointments" element={<Appointments />} />
        <Route path = "/appointments/schedule" element={<NewAppointment />} />
        <Route path="/users/:id" element= {<AppointmentsUserDetail />} />
        <Route path="/contact" element= {<Contact />} />
        <Route path="*" element= {<ErrorPage />} />
      </Routes>   
      
      <Container>
        <Footer />        
      </Container>   
    </div>
  )
}

export default App
