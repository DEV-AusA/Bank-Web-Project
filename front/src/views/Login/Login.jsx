import styles from "./Login.module.css"
import logoBank from "../../assets/logoBank.png"
import { useEffect, useState } from "react";
import validateLogin from "../../helpers/validateLogin";
import PopUpOk from "../../components/PopUpOk/PopUpOk";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

import { useDispatch } from "react-redux";
import { UserLogin } from "../../Redux/userSlice";

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ImgBanner6 from "../../assets/ImgBanner6.jpg"
import texts from "../../helpers/texts"

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
            [event.target.name]: event.target.value
        })
        // con cada cambio de state envio el input ingresado a la function validateLogin y lo valido
        const errors = validateLogin({
            ...userData,
            [name]:value
        });
        setErrors(errors);
    }

    //* guardo los dispatch dentro de reducers
    const dispatch = useDispatch();

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/users/login', userData);
            setMessage(response.data.message);
            setLogin(true);
            //* de aca se envia la ACTION (type: UserLogin, payload:) payload => datos de login al state global
            dispatch(UserLogin(response.data.loginUser));
            // dispatch(UserAppointments(response.data.loginUser));
            // setFormData(initialState);
        } catch (error) {
            setMessage(error.response.data.message);
            setLogin(true)
        }
    }
    // controlar los inputs vacios al inicio y solo cuando cumplan las validaciones
    useEffect(() => {
        const isFormValid = Object.values(errors).every(error => error === '');
        // al inicio
        const isFormEmpty = Object.values(userData).some(value => value === '');
        setIsValid(isFormValid && !isFormEmpty);
    }, [errors]);

    //* button modal
    const [modalShow, setModalShow] = useState(false);

    return (
        <Container fluid className={`${styles.container} vh-100 d-flex justify-content-center align-items-center p-0 m-0`}>
            {/* <Row xs={1} md={2} className={`${styles.bannerLeftLogin} m-0 p-0 col-2`}>
                    <Card.Img className="m-0 p-0" variant="top" src={ImgBanner6} fluid="true"/>
            </Row> */}
            <div className={styles.screen}>
                <div className={styles.screen__content}>
                    <Form className={styles.login} onSubmit={handleOnSubmit}>
                        <NavLink to="/" className={`${styles.loginBanner} mb- text-decoration-none`}>
                            <h1 className="display-4">Banco</h1>
                            <img src={logoBank}/>
                        </NavLink>
                        <div className={`${styles.loginBannerText}`}>
                             <h3>te da la bienvenida</h3>
                         </div>
                        <Form.Group className={`${styles.login__field} mb-3`} >
                        <FloatingLabel controlId="floatingInputGrid" label="Usuario">
                            <Form.Control
                            className="rounded-0"
                            type="text"
                            placeholder="Username"
                            value={userData.username}
                            name="username"
                            onChange={handleInputChange}
                            />
                            {errors.username && <p style={{color:'red', margin: 0}}>{errors.username}</p>}
                        </FloatingLabel>
                        </Form.Group>

                        <Form.Group className={`${styles.login__field} mb-3`} >
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
                        type="submit"
                        onClick={() => setModalShow(true)}
                        >
                            <span>Ingresar</span>
                        </Button>
                        {login && <PopUpOk onHide={() => setModalShow(false)} show={modalShow} message = {message}/>}                        
                    </Form>
                </div>
                <div className={styles.screen__background}>
                     <span className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`} ></span>
                     <span className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`} ></span>		
                     <span className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`} ></span>
                     <span className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`} ></span>
                 </div>
            </div>
            <div className={styles.screenBg}>
                    <span className={`${styles.screenBgShape} ${styles.screenBgShape5}`} ></span>
                     <span className={`${styles.screenBgShape} ${styles.screenBgShape4}`} ></span>
                     <span className={`${styles.screenBgShape} ${styles.screenBgShape3}`} ></span>		
                     <span className={`${styles.screenBgShape} ${styles.screenBgShape2}`} ></span>
                     <span className={`${styles.screenBgShape} ${styles.screenBgShape1}`} ></span>
            </div>
        </Container>
    );
};

export default Login