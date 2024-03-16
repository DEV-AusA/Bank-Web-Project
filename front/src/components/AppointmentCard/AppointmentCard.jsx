import Button from "react-bootstrap/esm/Button";
import styles from "./AppointmentCard.module.css"
import { useState } from "react";
import RegisterOkPopUp from "../Register/RegisterOkPopUp";

const AppointmentCard = ({id, date, time, userId, status}) => {
    let estado = status ? "vigente" : "cancelado";
    let colorState = estado === "vigente" ? styles.state : styles.stateCancel;

    const [cancelColor, setCancelColor] = useState(colorState);
    const [cancelAppointment, setCancelAppointment] = useState(estado);
    const [buttonDisabled, setButtonDisabled] = useState(!status);
    const [message, setMessage] = useState('');
    const [popUp, setPoPuP] = useState(false);

    const updateAppointment = async () => {

        
        try {
            const requestBody = {
                userId: userId,
                status: false
            };
            
            const response = await fetch(`http://localhost:3000/appointments/cancel/${id}`,  {
                method: 'PUT', // Cambia el método a PUT
                headers: {
                    'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud es JSON
                },
                body: JSON.stringify(requestBody) // Convierte el objeto requestBody a JSON
            });
            const data = await response.json();
            setCancelColor(styles.stateCancel);
            setCancelAppointment("cancelado");
            setMessage(data.message);
            setButtonDisabled(true);
            setPoPuP(true);  
            console.log(data.message);
          } catch (error) {
            console.error("Error al realizar la actualización:", error);
          }
    };

    const handleOnClose = (event) => {
        event.preventDefault();
        setPoPuP(false);        
    }

    return (
        <>
            <td>{id}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>{userId}</td>
            <td className= {`${cancelColor} text-center text-white fw-bold`}>{cancelAppointment}</td>
            <td className="d-flex justify-content-center">
                <Button type="button" disabled={buttonDisabled} variant="warning" onClick={updateAppointment}>cancelar</Button>{' '}
                {popUp && <RegisterOkPopUp handleOnClose = {handleOnClose} message = {message}/>}
            </td>
        </>
    )
}

export default AppointmentCard