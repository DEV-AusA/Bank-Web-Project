import { useEffect, useState } from "react"
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import styles from "./MisTurnos.module.css"
import { useParams } from "react-router-dom";

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
        <div>
            <div>
                <h2>Turnos de {userName}</h2>
            </div>
            {appointments.map((turno) => {
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
    )
}

export default MisTurnosUserDetail