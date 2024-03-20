import { useEffect, useState } from "react"
import UserCard from "../../components/UserCard/UserCard";
import styles from "./Users.module.css";

import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UsersData } from "../../Redux/userSlice";

const Users = () => {

    // login de user
    const loggedInUsers = useSelector(state => state.users.userDataLogin.login);
    // users de store global
    const usersData = useSelector(state => state.users.usersData);

    const navigate = useNavigate();
    // guardo los dispatch dentro de reducers
    const dispatch = useDispatch();

    // mandar al home si el loggedInUsers es false
    useEffect(() => {
        if (!loggedInUsers) {
            navigate("/");
        }
    }, [loggedInUsers, navigate]);

    useEffect(() => {

        const fetchData = async () => {
          try {

            const response = await fetch(`http://localhost:3000/users`,{
                method: 'GET',
                headers: {
                    'token': 'autenticado'
                  }
            });

            const data = await response.json();
            dispatch(UsersData(data))
            // setUsers(data);
          } catch (error) {
            console.error("Error al obtener los datos de la DB:", error);
          }
        };
      
        fetchData();
        
    }, []);
    
    return (   
        <Container  className={styles.container}>
            <h1 className="display-3 fs-2 p-3 fw-bold">Bienvenido al gestor de usuarios</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Numero de DNI</th>
                  <th>Turnos</th>
                </tr>
              </thead>
              <tbody>
                 { usersData.map((user) => {
                        return (
                            <tr key={user.id} >
                                <UserCard
                                id={user.id}
                                name={user.name}
                                email={user.email}
                                birthdate={user.birthdate}
                                nDni={user.nDni}
                                userId = {user.id}
                                // appointments={user.appointments}
                                />
                            </tr>
                        )
                    })}
              </tbody>
            </Table>
        </Container>
    )
}

export default Users