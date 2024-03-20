import { useEffect, useState } from "react";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import styles from "./Appointments.module.css"

import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppointmentsData } from "../../Redux/userSlice";

const Appointments = () => {

    // login de user
    const loggedInUsers = useSelector(state => state.users.userDataLogin);
    // todos los appointments
    const appointmentsData = useSelector(state => state.users.usersAppointments);

    // adornar hora
    const formatHour = (hour) => {
      const hourString = hour.toString();        
      const formattedHour = hourString.slice(0, 2) + ':' + hourString.slice(2); // divido los 4 digitos en 2  al principio y aumento los ":" 
      return formattedHour;
    }

    const navigate = useNavigate();
    // guardo los dispatch dentro de reducers
    const dispatch = useDispatch();

    // mandar al home si el loggedInUsers es false
    useEffect(() => {
        if (!loggedInUsers.login) {
          
            navigate("/");
        }
    }, [loggedInUsers.login, navigate]); // verifica si hay algun cambio en el state de loggedInUsers.login 

    useEffect(() => {

        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/appointments`);
            const data = await response.json();
            // setAppointments(data);
            dispatch(AppointmentsData(data))
          } catch (error) {
            console.error("Error al obtener los datos de la DB:", error);
          }
        };
      
        fetchData();
        
    }, []);
    
    return loggedInUsers.login ? (
        <Container className={`${styles.container}`}>
            <h1 className="display-3 fs-2 p-3 fw-bold">Bienvenido al gestor de Turnos</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Turno Nro</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Usuario ID</th>
                  <th className="col-2 text-center">Estado del turno</th>
                  <th className="col-2 text-center">Accion</th>
                </tr>
              </thead>
              <tbody>
                { appointmentsData.map((turno) => {
                    return (
                        <tr key={turno.id} className={styles.misturnoscard}>
                            <AppointmentCard
                                id={turno.id}
                                date={turno.date}
                                time={formatHour(turno.time)}
                                userId={turno.userId}
                                status={turno.status}
                            />
                        </tr>
                    )
                })}
              </tbody>
            </Table>
        </Container>
    ) : null;
}

export default Appointments