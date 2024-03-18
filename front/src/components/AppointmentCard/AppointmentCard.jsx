import Button from "react-bootstrap/esm/Button";
import styles from "./AppointmentCard.module.css"
import { useState } from "react";
import PopUpOk from "../PopUpOk/PopUpOk";
import { useDispatch, useSelector } from "react-redux";
import { UserAppointments } from "../../Redux/userSlice";

const AppointmentCard = ({id, date, time, userId, status}) => {
    let estado = status ? "vigente" : "cancelado";
    let colorState = estado === "vigente" ? styles.state : styles.stateCancel;

    // appointments de user
    const appointmentsUser = useSelector(state => state.users.userDataAppointments);

    const [appointmentStatus, setAppointmentStatus] = useState(status);
    const [cancelColor, setCancelColor] = useState(colorState);
    const [cancelAppointment, setCancelAppointment] = useState(estado);
    const [buttonDisabled, setButtonDisabled] = useState(!status);
    const [message, setMessage] = useState('');
    const [popUp, setPoPuP] = useState(false);

    const dispatch = useDispatch();

    const updateAppointment = async () => {

        try {
            const requestBody = {
                userId: userId,
                status: !appointmentStatus, // Cambia el estado opuesto
            };
            
            const response = await fetch(`http://localhost:3000/appointments/cancel/${id}`,  {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud es JSON
                },
                body: JSON.stringify(requestBody) // Convierte el objeto requestBody a JSON
            });
            const data = await response.json();

            // Encuentra el appointment que coincide con el userId y el id proporcionados
            const updatedAppointments = appointmentsUser.map((appointment) => {
                if (appointment.userId === userId && appointment.id === id) {
                // actualizo solo la propiedad status para este appointment
                return { ...appointment, status: !status };
                }
                return appointment;
            });

            // Actualizo el estado global con la nueva lista de appointments
            dispatch(UserAppointments(updatedAppointments));

            setAppointmentStatus(!appointmentStatus);
            setCancelColor(styles.stateCancel);
            setCancelAppointment("cancelado");
            setMessage(data.message);
            setButtonDisabled(true);
            setPoPuP(true); 
          } catch (error) {
            console.error("Error al realizar la actualización:", error);
          }
    };

    //* button modal
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <td>{id}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>{userId}</td>
            <td className= {`${cancelColor} text-center text-white fw-bold`}>{cancelAppointment}</td>
            <td className="d-flex justify-content-center">
                <Button
                type="button"
                disabled={buttonDisabled}
                variant="warning"
                onClick={() => {
                    updateAppointment();
                    setModalShow(true);
                    }
                }>
                cancelar</Button>{' '}
                
                {popUp && <PopUpOk onHide={() => setModalShow(false)} show={modalShow} message = {message}/>}
            </td>
        </>
    )
}

export default AppointmentCard