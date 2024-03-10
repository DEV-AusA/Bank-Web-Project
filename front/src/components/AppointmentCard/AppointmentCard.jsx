import styles from "./AppointmentCard.module.css"

const AppointmentCard = ({id, date, time, userId, status}) => {
    let estado = status ? "vigente" : "cancelado";
    let colorState = estado ==="vigente" ? styles.state : styles.stateCancel

    return (
        <div className= {styles.appointment}>
            <ul>
                <li>Turno: {id}</li>
                <li>Fecha: {date}</li>
                <li>Hora: {time}</li>
                <li>Usuario: {userId}</li>
                <li>Estado del turno: </li>
                <li className= {colorState}>{estado}</li>
            </ul>
        </div>
    )
}

export default AppointmentCard