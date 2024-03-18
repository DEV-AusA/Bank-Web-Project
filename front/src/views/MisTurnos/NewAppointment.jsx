import styles from "./NewAppointment.module.css"
import logoBank from "../../assets/logoBank.png"
import { useEffect, useState } from "react";
import validateAppointment from "../../helpers/validateAppointment";
import PopUpOk from "../../components/PopUpOk/PopUpOk";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

import { useSelector } from "react-redux";

const NewAppointment = () => {

    // login de user y obtengo el id del user para asiganrle el turno
    const loggedInUsers = useSelector(state => state.users.userDataLogin);
    
    const navigate = useNavigate();
    // mandar al home si el loggedInUsers es false
    useEffect(() => {
        if (!loggedInUsers.login) {
            navigate("/");
        }
    }, [loggedInUsers.login, navigate]);
    
    const [appoinmentData, setAppoinmentData] = useState({
        date: '',
        time: '',
        userId: '',
    });
    // activador del PopUp
    const [ AppoOk, setAppoOk ] = useState(false);
    
    const [message, setMessage] = useState('');
    // state que controla errores de inputs
    const [errors, setErrors] = useState({
        date: '',
        time: ''
    });
    //state de activacion de botton si los campos cumplen las validaciones
    const [isValid, setIsValid] = useState(false);
    
    // esta function recibirá los cambios de los inputs ingresados
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // obtengo el id del user para asiganrle el turno
        const userId =  loggedInUsers.user.id;

        // "name" se actualiza automaticamente y toma el name de input donde se estan ingresando datos
        //& por eso es muy importante en la etiqueta name colocar el mismo nombre  que se colocó en useState
        setAppoinmentData({
            ...appoinmentData,
            [event.target.name]: event.target.value,
            userId: userId
        })
        // con cada cambio de state envio el input ingresado a la function validateAppointment y lo valido
        const errors = validateAppointment({
            ...appoinmentData,
            [name]:value
        });
        setErrors(errors);
    }

    //* guardo los dispatch dentro de reducers
    // const dispatch = useDispatch();

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        // cambiando a formato Local la fecha 
        const selectedDate = new Date(appoinmentData.date);
        const day = (selectedDate.getDate() + 1 ).toString().padStart(2, '0'); // Obtener día y añadir ceros a la izquierda si es necesario
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // Obtener mes (se suma 1 porque los meses van de 0 a 11) y añadir ceros a la izquierda si es necesario
        const year = selectedDate.getFullYear().toString(); // Obtener el año
        const dateLocal = `${day}-${month}-${year}`;
      
        try {
            const response = await axios.post('http://localhost:3000/appointments/schedule', { ...appoinmentData, date: dateLocal });
            setMessage(response.data.message);
            setAppoOk(true);
        } catch (error) {
            setMessage(error.response.data.message);
            setAppoOk(true)
        }
    }
    useEffect(() => {
        const isFormValid = Object.values(errors).every(error => error === '');
        setIsValid(isFormValid);
    }, [errors]);
    
    //* button modal
    const [modalShow, setModalShow] = useState(false);

    return loggedInUsers.login ? (
        <Container className={`${styles.container} mt-3 d-flex justify-content-center align-items-center`}>
            <div className={styles.screen}>
                <div className={styles.screenContent}>
                    <Form className={styles.formAppointment} onSubmit={handleOnSubmit}>
                        <Form.Group>
                            <NavLink to="/" className={`${styles.formAppointmentBanner} mb- text-decoration-none`}>
                                <h1 className="display-4">Banco</h1>
                                <img src={logoBank}/>
                            </NavLink>
                            <div className={styles.formAppointmentBannerText}>
                                <h3>Estamos contigo</h3>
                            </div>
                        </Form.Group>
                        <Form.Group className={`${styles.formAppointmentField} mb-3`} >
                        <FloatingLabel controlId="floatingInputGrid" label="Fecha">
                            <Form.Control
                            className="rounded-0"
                            type="date"
                            placeholder="Fecha"
                            value={appoinmentData.date}
                            name="date"
                            onChange={handleInputChange}
                            />
                            {errors.date && <p className={`${styles.formAppointmentError} m-0`} >{errors.date}</p>}
                        </FloatingLabel>
                        </Form.Group>

                        <Form.Group className={`${styles.formAppointmentField} mb-3`} >
                        <FloatingLabel controlId="floatingInputGrid" label="Horario">
                        
                            <Form.Control
                            className="rounded-0"
                            type="text"
                            placeholder="Horario"
                            value={appoinmentData.time}
                            name="time"
                            onChange={handleInputChange}
                            />
                            {errors.time && <p className={`${styles.formAppointmentError} m-0`}>{errors.time}</p>}
                        </FloatingLabel>
                        </Form.Group>
                        <Button
                        className={styles.formAppointmentSubmit}
                        disabled = {!isValid}
                        variant="primary"
                        type="submit"
                        onClick={() => setModalShow(true)}
                        >
                            <span>Solicitar turno</span>
                        </Button>     
                        {AppoOk && <PopUpOk onHide={() => setModalShow(false)} show={modalShow} message = {message}/>}
                    </Form>
                </div>
                <div className={styles.screen__background}>
                     <span className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`} ></span>
                     <span className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`} ></span>		
                     <span className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`} ></span>
                     <span className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`} ></span>
                 </div>
            </div>
        </Container>
    ) : null;
};

export default NewAppointment