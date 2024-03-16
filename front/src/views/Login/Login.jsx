import styles from "./Login.module.css"
import logoBank from "../../assets/logoBank.png"
import { useEffect, useState } from "react";
import validateLogin from "../../helpers/validateLogin";
import RegisterOkPopUp from "../../components/Register/RegisterOkPopUp";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

const Login = () => {

    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });
    const [ login, setLogin ] = useState(false);
    const [message, setMessage] = useState('');
    // state que controla errores de inputs
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });
    //state de activacion de botton si los campos cumplen las validaciones
    const [isValid, setIsValid] = useState(false);

    // esta function recibirá los cambios de los inputs ingresados
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // se actualiza el valor de userData
        // "name" se actualiza automaticamente y toma el name de input donde se estan ingresando datos
        //& por eso es muy importante en la etiqueta name colocar el mismo nombre  que se colocó en useState
        setUserData({
            ...userData,
            [name]: value
        })
        // con cada cambio de state envio el input ingresado a la function validateLogin y lo valido
        const errors = validateLogin({
            ...userData,
            [name]:value
        });
        setErrors(errors);
    }
    const handleOnSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/users/login', userData);
            setMessage(response.data.message);
            setLogin(true)
            // setFormData(initialState);
        } catch (error) {
            setMessage(error.response.data.message);
            setLogin(true)
        }
    }
    useEffect(() => {
        const isFormValid = Object.values(errors).every(error => error === '');
        setIsValid(isFormValid);
    }, [errors]);
    
    // Popup despues de login
    const handleOnClose = (event) => {
        event.preventDefault();
        setLogin(false);        
    }

    return (
        <Container className={`${styles.container} vh-100 d-flex justify-content-center align-items-center`}>
            <div className={styles.screen}>
                <div className={styles.screen__content}>
                    <Form className={styles.login} onSubmit={handleOnSubmit}>
                        <NavLink to="/" className={`${styles.loginBanner} mb- text-decoration-none`}>
                            <h1>Banco</h1>
                            <img src={logoBank}/>
                        </NavLink>
                        <div className={styles.loginBannerText}>
                             <h3>te da la bienvenida</h3>
                         </div>
                        <Form.Group className={`${styles.login__field} mb-3`} controlId="formBasicEmail">
                            <Form.Control
                            className="rounded-0"
                            type="text"
                            placeholder="Username"
                            value={userData.username}
                            name="username"
                            onChange={handleInputChange}
                            />
                            {/* <Form.Text className="text-muted">
                            Nunca compartiremos tus datos personales.
                            </Form.Text> */}
                            {errors.username && <p style={{color:'red', margin: 0}}>{errors.username}</p>}
                        </Form.Group>

                        <Form.Group className={`${styles.login__field} mb-3`} controlId="formBasicPassword">
                        <FloatingLabel controlId="floatingInputGrid" label="Password">
                        
                            <Form.Control
                            className="rounded-0"
                            type="password"                    
                            placeholder="Password"
                            value={userData.password}
                            name="password"
                            onChange={handleInputChange}
                            />
                            {errors.password && <p style={{color:'red', margin: 0}}>{errors.password}</p>}
                        </FloatingLabel>
                        </Form.Group>
                        <Button
                        className={styles.login__submit}
                        disabled = {!isValid}
                        variant="primary"
                        type="submit">
                            <span>Ingresar</span>
                        </Button>
                        {login && <RegisterOkPopUp handleOnClose = {handleOnClose} message = {message}/>}
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
    );
};

export default Login