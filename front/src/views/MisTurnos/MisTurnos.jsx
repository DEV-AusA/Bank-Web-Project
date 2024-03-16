import { useEffect, useState } from "react"
import myTurns from "../../helpers/myTurns"
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import styles from "./MisTurnos.module.css"

import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";

const MisTurnos = () => {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/appointments`);
            const data = await response.json();
            setAppointments(data);
          } catch (error) {
            console.error("Error al obtener los datos de la DB:", error);
          }
        };
      
        fetchData();
        
    }, []); 
    
    return (
        <Container  className={styles.container}>
            <h1>Bienvenido al gestor de Turnos</h1>
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
                { appointments.map((turno) => {
                    return (
                        <tr key={turno.id} className={styles.misturnoscard}>
                            <AppointmentCard
                                id={turno.id}
                                date={turno.date}
                                time={turno.time}
                                userId={turno.userId}
                                status={turno.status}
                            />
                        </tr>
                    )
                })}
              </tbody>
            </Table>
        </Container>
    )
}

export default MisTurnos