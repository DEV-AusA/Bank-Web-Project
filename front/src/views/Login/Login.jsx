import styles from "./Login.module.css"
import logoBank from "../../assets/logoBank.png"
import { useEffect, useState } from "react";
import validateLogin from "../../helpers/validateLogin";
import RegisterOkPopUp from "../../components/Register/RegisterOkPopUp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <div className={styles.container}>
            <div className={styles.screen}>
                <div className={styles.screen__content}>
                    <form className={styles.login} onSubmit={handleOnSubmit}>
                        <div className={styles.loginBanner}>
                            <h1>Banco</h1>
                            <img src={logoBank}/>
                        </div>
                        <div className={styles.loginBannerText}>
                            <h2>te da la bienvenida</h2>
                        </div>
                        <h2>Login</h2>
                        <div className={styles.login__field}>
                            <input type="text"
                            placeholder="Username"
                            value={userData.username}
                            name="username"
                            onChange={handleInputChange}
                            />
                            {errors.username && <p style={{color:'red', margin: 0}}>{errors.username}</p>}
                        </div>
                        <div className={styles.login__field}>
                            <input type="password"
                            placeholder="Password"
                            value={userData.password}
                            name="password"
                            onChange={handleInputChange}
                            />
                            {errors.password && <p style={{color:'red', margin: 0}}>{errors.password}</p>}
                        </div>
                        <button
                        className={styles.login__submit}
                        disabled = {!isValid}>
                            <span>Ingresar</span>
                        </button>

                        {login && <RegisterOkPopUp handleOnClose = {handleOnClose} message = {message}/>}
                    </form>
                </div>
                <div className={styles.screen__background}>
                    <span className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`} ></span>
                    <span className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`} ></span>		
                    <span className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`} ></span>
                    <span className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`} ></span>
                </div>
            </div>
        </div>
    );
};

export default Login