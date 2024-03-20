import styles from "./NavBarItems.module.css"
import logoBank from "../../assets/logoBank.png"
import iconUser from "../../assets/iconUser.jpg"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { UserLogin } from "../../Redux/userSlice";
import PopUpOk from "../PopUpOk/PopUpOk";
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

const NavBarItems = () => {    
    // traigo el login del state
    // con useSelector accedo a cualquier propiedad que contenga los datos en el state global en este caso users
    // si es true cargo pestaña con sus turnos
    const loggedInUsers = useSelector(state => state.users.userDataLogin);

    const message = 'Cerrando sesion, hasta luego :)';
    
    const [ logOut, setLogOut ] = useState(false);

    //* guardo los dispatch dentro de reducers
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        // cambio el state del login del user de true a false
        const updatedUser = {
            ...loggedInUsers,
            login: false
        };
        dispatch(UserLogin(updatedUser));
        setLogOut(true);
    }
    // Popup despues de login
    const handleOnClose = (event) => {
        event.preventDefault();
        setLogOut(false);        
        navigate("/");
    }
    //* button modal
    const [modalShow, setModalShow] = useState(false);
    
    return(
        <Navbar expand="lg" className="bg-body-tertiary p-0">
            <Nav className={`${styles.titles}`}>
            <Container className={`${styles.titlesContainer} d-flex`}>
                <NavLink to="/productsempresas" className="nav-link">
                    <span className="display-8">Empresas</span>
                </NavLink>
                <NavLink to="/personas" className="nav-link">
                    <span className="display-8">Personas</span>
                </NavLink>
            </Container>
            </Nav>
            <Container className={`${styles.container}`}>
                <Navbar className="bg-body-tertiary col- p-0">
                    <Container>
                        <NavLink to="/" className={`m-0 d-flex justify-content-center ${styles.logoBank}`}>
                            <h1 className="display-4 p-0 m-0 fw-bold mt-auto mb-0">Banco</h1>
                            <Image 
                            src={logoBank}
                            className=""
                            alt="Bank logo"                            
                            fluid
                            />
                        </NavLink>
                    </Container>
                </Navbar>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={`${styles.navbar} me-auto`}>                    
                    {!loggedInUsers.login &&
                        <NavLink to="/login" className="nav-link">
                            <span>Banca Online</span>
                        </NavLink>                  
                    }
                    {!loggedInUsers.login &&
                        <NavLink to="/users/register" className="nav-link">
                            <span>Registrate</span>
                        </NavLink>                    
                    }
                    {loggedInUsers.login && 
                        <NavLink to="/users" className="nav-link">
                            <span>Usuarios</span>
                            <Badge bg="danger">admin</Badge>
                        </NavLink>
                    }
                    {loggedInUsers.login && 
                        <NavLink to="/appointments" className="nav-link">
                            <span>Turnos</span>
                            <Badge bg="danger">admin</Badge>
                        </NavLink>
                    }                   
                    {loggedInUsers.login && 
                        <NavLink to={`/users/${loggedInUsers.user.id}`} className="nav-link">
                            <span>Mis turnos</span>
                        </NavLink>
                    }
                    {loggedInUsers.login && 
                        <NavLink to={`/appointments/schedule`} className="nav-link">
                            <span>Nuevo turno</span>
                        </NavLink>
                    }
                    <NavLink to="/contact" className="nav-link">
                        <span>Contacto</span>
                    </NavLink>
                    {/* button */}
                    <NavDropdown title="Menu" id="basic-nav-dropdown">
                        <div className={`${styles.menuItems} `}>
                            <NavDropdown.Item href="#">Préstamos</NavDropdown.Item>
                            <NavDropdown.Item href="#">Seguros</NavDropdown.Item>
                            <NavDropdown.Item href="#">Inversión</NavDropdown.Item>
                            <NavDropdown.Item href="#">Catalogo de puntos</NavDropdown.Item>
                            {loggedInUsers.login &&
                                <NavDropdown.Divider />
                            }
                            {loggedInUsers.login &&
                                <NavDropdown.Item onClick={() => {
                                    setModalShow(true)
                                    handleLogOut()
                                    }
                                }>Cerrar sesion</NavDropdown.Item>
                            }
                        </div>
                    </NavDropdown>
                    {logOut && <PopUpOk onClick = {handleOnClose} onHide={() => setModalShow(false)} show={modalShow} message = {message}/>}

                    {loggedInUsers.login &&
                        <NavDropdown title="Usuario" id="basic-nav-dropdown"className={`${styles.menuUser}`}>
                            <div className={`${styles.menuItems}`}>
                                    <Nav.Item>
                                        <Container>
                                            <Image 
                                                src={iconUser} // Asegúrate de tener la URL de la imagen del usuario aquí
                                                // className={styles.userImage}
                                                className="p-2 col-6"
                                                alt="User Icon"
                                                roundedCircle                           
                                                fluid
                                            />
                                            <Nav.Item className="display-4 col-6">
                                                <h4>Cesar</h4>
                                                <h5>Edad: 35</h5>
                                                <h5>Admin del sitio</h5>
                                                <h5>cesarausa@gmail.com</h5>                                            
                                            </Nav.Item>
                                        </Container>
                                    </Nav.Item>
                                <NavDropdown.Item href="#">Home</NavDropdown.Item>
                                <NavDropdown.Item href="#">Perfil</NavDropdown.Item>
                                <NavDropdown.Item href="#">Configuracion del Sitio</NavDropdown.Item>
                                <NavDropdown.Item href="#">Ayuda</NavDropdown.Item>
                                {loggedInUsers.login &&
                                    <NavDropdown.Divider />
                                }
                                {loggedInUsers.login &&
                                    <NavDropdown.Item onClick={() => {
                                        setModalShow(true)
                                        handleLogOut()
                                        }
                                    }>Cerrar sesion</NavDropdown.Item>
                                }
                            </div>
                        </NavDropdown>

                    }
                        
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavBarItems