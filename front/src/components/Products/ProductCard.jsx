import { useEffect, useState } from "react";
import validate from "../../helpers/validate";
import styles from "./ProductCard.module.css";
import logoBank from "../../assets/logoBank.png";
import axios from 'axios';
import PopUpOk from "../../components/PopUpOk/PopUpOk";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { NavLink, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const ProductCard = () => {

    const initialState = {
        name: '',
        email: '',
        birthdate: '',
        nDni: '',
        product: '',
        username: '',
        password: '',
        confirmpassword: ''
    }
    // uso el initialState de modelo para los state
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    
    const [registerOk, setRegisterOk] = useState(false);
    // state del msj de la DB
    const [message, setMessage] = useState('');

    //state de activacion de botton si los campos cumplen las validaciones
    const [isValid, setIsValid] = useState(false);
    
    const handleInputForm = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        
        setFormData({
            ...formData,
            // ECMA 6 [name] asigno nombre de una variable "name" como propiedad
            // y le asignno un valor a esa propiedad en este caso sera "value"
            [name]: value
        })
        const errInput = validate({
            ...formData,
            [name]: value
        });
        setErrors(errInput);
    }
    // Handle
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        // solo datos que iran a la DB
        const newUser = {
            name: formData.name,
            email: formData.email,
            birthdate: formData.birthdate,
            nDni: formData.nDni,
            username: formData.username,
            password: formData.password,
        }
        
        // try {
        //     const response = await axios.post('http://localhost:3000/users/register', newUser);
        //     setMessage(response.data.message);
        //     setRegisterOk(true)
        //     // setFormData(initialState);
        // } catch (error) {
        //     setMessage(error.response.data.message);
        //     setRegisterOk(true)
        // }
    }
    // hook useEffect 
    useEffect(() => {
        const isFormValid = Object.values(errors).every(error => error === '');
        setIsValid(isFormValid);
    }, [errors]);

    const handleReset = (event) => {
        event.preventDefault()
        //state de inicio, osea vacio
        setFormData(initialState);
    }

    const formDataArray = [
        {
            label: "Nombre completo: ",
            type: "text",
            name: "name",
            placeholder: "Por ejemplo Cesar Ausa",
        },
        {
            label: "DNI: ",
            type: "number",
            name: "nDni",
            placeholder: "Por ejemplo 50123456",
        },
        {
            label: "Fecha de Nacimiento: ",
            type: "date",
            name: "birthdate",
            placeholder: "Por ejemplo 04-01-1989",
        },
        {
            label: "Email: ",
            type: "text",
            name: "email",
            placeholder: "ejemplo@ejemplo.com",
        },
        {
            label: "Seccione su producto: ",
            type: "select",
            name: "product",
            placeholder: "",
        },
        {
            label: "Usuario: ",
            type: "text",
            name: "username",
            placeholder: "",
        },
        {
            label: "Contraseña: ",
            type: "password",
            name: "password",
            placeholder: "*****",
        },
        {
            label: "Confirme contraseña: ",
            type: "password",
            name: "confirmpassword",
            placeholder: "*****",
        },

    ]

    //* button modal
    const [modalShow, setModalShow] = useState(false);

    return (
        <Container className={`${styles.container} m-0 p-0 d-flex justify-content-center align-items-center`}>
            <div className={styles.screen}>
                <div className={styles.screenContent}>
                    <Form className={styles.formAppointment} onSubmit={handleOnSubmit}>
                        <Row className="p-0 m-0">

                            {formDataArray.map((input) => {
                                // para que carge otras clases
                                const fieldClassName = input.name === "nDni" || input.name === "birthdate" || input.name === "email" || input.name === "product" ? "col-3" : "col-12";
                                // const fieldClassName = input.name === "nDni" || input.name === "birthdate" || input.name === "email" ? styles.register__field__mid : styles.register__field;

                                return (
                                    <Col key={input.name} className={fieldClassName}>
                                        <Form.Group>
                                            <FloatingLabel htmlFor={input.name}>{input.label}</FloatingLabel>
                                            {input.name === "product"
                                            ?   <Form.Select aria-label="Productos">
                                                    <option>Selecciona</option>
                                                    <option value="1">Visa Classic</option>
                                                    <option value="2">Visa Platinum</option>
                                                    <option value="3">Visa Gold</option>
                                                </Form.Select>
                                            :   <Form.Control
                                                type= {input.type}
                                                id={input.name}
                                                placeholder= {input.placeholder}
                                                value={formData[input.name]}
                                                name={input.name}
                                                onChange={handleInputForm}
                                                />
                                            }
                                            {errors[input.name] ? <p style={{color:'red', margin: 0}}>{errors[input.name]}</p> : null}
                                        </Form.Group>
                                    </Col>
                                )
                            })}

                            {/* <Form.Group className={`${styles.formAppointmentField} mb-3`} >
                            <FloatingLabel controlId="floatingInputGrid" label="Fecha">
                                <Form.Control
                                className="rounded-0"
                                type="text"
                                placeholder="Fecha"
                                // value={appoinmentData.date}
                                name="date"
                                // onChange={handleInputChange}
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
                                // value={appoinmentData.time}
                                name="time"
                                // onChange={handleInputChange}
                                />
                                {errors.time && <p className={`${styles.formAppointmentError} m-0`}>{errors.time}</p>}
                            </FloatingLabel>
                            </Form.Group> */}

                            {/* <Button
                            className={styles.formAppointmentSubmit}
                            disabled = {!isValid}
                            variant="primary"
                            type="submit"
                            onClick={() => setModalShow(true)}
                            >
                                <span>Solicitar turno</span>
                            </Button>      */}
                            {/* {AppoOk && <PopUpOk onHide={() => setModalShow(false)} show={modalShow} message = {message}/>} */}
                        </Row>
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

    return (
        <div className={styles.container}>
            <div className={styles.screen}>
                <div className={styles.screen__content}>
                    <form className={styles.register} onSubmit={handleOnSubmit}>

                        <div className={styles.registerBanner}>
                            <h1>Banco</h1>
                            <img src={logoBank}/>
                            <h2>Registro</h2>
                        </div>

                        {formDataArray.map((input) => {
                            // para que carge otras clases
                            const fieldClassName = input.name === "nDni" || input.name === "birthdate" || input.name === "email" ? styles.register__field__mid : styles.register__field;

                            return (
                                <div key={input.name} className={fieldClassName}>
                                    <label htmlFor={input.name}>{input.label}</label>
                                    <input
                                    type= {input.type}
                                    id={input.name}
                                    placeholder= {input.placeholder}
                                    value={formData[input.name]}
                                    name={input.name}
                                    onChange={handleInputForm}
                                    />
                                    {errors[input.name] ? <p style={{color:'red', margin: 0}}>{errors[input.name]}</p> : null}
                                </div>
                            )
                        })}

                        <div className={styles.register__btn__submit}>
                            
                            <button
                            className={styles.register__submit}
                            disabled = {!isValid}
                            onClick={() => setModalShow(true)}
                            >
                            Enviar Solicitud
                            </button>
                            
                            <button type="button" className={styles.register__submit} onClick={handleReset}>Limpiar campos</button>
                        </div>
                            {registerOk && <PopUpOk onHide={() => setModalShow(false)} show={modalShow} message = {message}/>}

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

export default ProductCard
