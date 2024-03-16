import { useEffect, useState } from "react"
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import styles from "./MisTurnos.module.css"
import { useParams } from "react-router-dom";

import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";

const MisTurnosUserDetail = () => {

    const [appointments, setAppoinments] = useState([]);
    const [userName, setUserName] = useState('')
    // useParams lee el /:id del patch
    const { id } = useParams();
    

    useEffect(() => {

        const userAppoinmentsFetch = async () => {
          try {
            const response = await fetch(`http://localhost:3000/users/${id}`);
            const data = await response.json();
            setAppoinments(data.appointments);
            setUserName(data.name)
          } catch (error) {
            console.error("Error al obtener los datos de la DB:", error);
            // console.log("HOLAA MAAAALLLL");
            // setAppoinments(error.data)
          }
          // limpiar el state
          return () => {
            setAppoinments([])
          }
        };
      
        userAppoinmentsFetch();
        
    }, []); 

    return (
        <Container  className={styles.container}>
            <h1>Turnos de {userName}</h1>
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

        // <div>
        //     <div>
        //         <h2>Turnos de {userName}</h2>
        //     </div>
        //     {appointments.map((turno) => {
        //         return (
        //             <tr key={turno.id} className={styles.misturnoscard}>
        //                 <AppointmentCard
        //                     id={turno.id}
        //                     date={turno.date}
        //                     time={turno.time}
        //                     userId={turno.userId}
        //                     status={turno.status}
        //                 />
        //             </tr>
        //         )
        //     })}
        // </div>
    )
}

export default MisTurnosUserDetail