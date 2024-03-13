import { useEffect, useState } from "react"
import myTurns from "../../helpers/myTurns"
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import styles from "./MisTurnos.module.css"

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
        <div className={styles.containerturnos}>
            <h1>Bienvenido al gestor de turnos</h1>
            <div className={styles.misturnos}>
                { appointments.map((turno) => {
                    return (
                        <div key={turno.id} className={styles.misturnoscard}>
                            <AppointmentCard
                                id={turno.id}
                                date={turno.date}
                                time={turno.time}
                                userId={turno.userId}
                                status={turno.status}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MisTurnos