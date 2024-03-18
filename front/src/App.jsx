import Home from "./views/Home/Home";
import styles from "./App.module.css";
import Register from "./views/Register/Register";
import MisTurnos from "./views/MisTurnos/MisTurnos"
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom"
import Login from "./views/Login/Login";
import MisTurnosUserDetail from "./views/MisTurnos/MisturnosUserDetail";
import Users from "./views/Users/Users";
import Personas from "./views/Personas/Personas";
import Empresas from "./views/Empresas/Empresas";
import Contact from "./views/Contact/Contact";
import ErrorPage from "./components/ErrorPage/ErrorPage";

import { useDispatch, useSelector } from "react-redux";
import UserLoginVerify from "./components/UserLoginVerify/UserLoginVerify";
import { UserAppointments } from "./Redux/userSlice";
import NavBarItems from "./components/NavBar/NavBarItems";
import { useState } from "react";
import NewAppointment from "./views/MisTurnos/NewAppointment";

function App() {
  // path actual de user
  const location = useLocation();

  // con useSelector accedo a cualquier propiedad que contenga los datos en el state global en este caso users
  // const loggedInUsers = useSelector(state => state.users);

  // // importo el dispatch para el button eliminar
  // const dispatch = useDispatch();

  // const handleOnClick = (id) => {
  //   // le paso el id
  //   dispatch(UserAppointments(id));
  // }

  return (
    <div className= {styles.body}>
      {location.pathname !== "/login" && <NavBar />}

      {/* Redux */}
      {/* <h1>Login de users</h1>
      <UserLoginVerify />
      <hr />

      { !loggedInUsers.length 
      ? <h3>No hay Users Logeados</h3>
      :loggedInUsers.map((user) => (
        <h3
        key={user.id}> {user.username} {user.password}
        <button onClick={() => handleOnClick(user.id)}>Eliminar</button>
        </h3>
      ))
      } */}

      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path="/productsempresas" element={<Empresas />} />
        <Route path="/personas" element={<Personas />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/users/register" element={<Register />} />
        <Route path="/users" element= {<Users />} />
        <Route path = "/appointments" element={<MisTurnos />} />
        <Route path = "/appointments/schedule" element={<NewAppointment />} />
        <Route path="/users/:id" element= {<MisTurnosUserDetail />} />
        <Route path="/contact" element= {<Contact />} />
        <Route path="*" element= {<ErrorPage />} />
      </Routes>      
    </div>
  )
}

export default App
