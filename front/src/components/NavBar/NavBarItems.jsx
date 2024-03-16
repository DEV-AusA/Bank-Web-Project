import styles from "./NavBarItems.module.css"
import logoBank from "../../assets/logoBank.png"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";

const NavBarItems = () => {
    
    return(
        <Navbar expand="lg" className="bg-body-tertiary p-0">
            <Container>
                <Navbar className="bg-body-tertiary col- p-0">
                    <Container>
                        <Navbar.Brand className={`m-0 d-flex justify-content-center ${styles.logoBank}`}>
                            <h1>Banco</h1>
                            <img
                            src={logoBank}
                            className="d-inline-block align-top"
                            alt="Bank logo"
                            />
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={`${styles.navbar} me-auto`}>
                    <NavLink to="/productsempresas" className={`${({isActive}) => isActive ? styles.active : ""} nav-link`}>
                        <span>Empresas</span>
                    </NavLink>
                    <NavLink to="/personas" className={`${({isActive}) => isActive ? styles.active : ""} nav-link`}>
                            <span>Personas</span>
                    </NavLink>
                    <NavLink to="/login" className={`${({isActive}) => isActive ? styles.active : ""} nav-link`}>
                        <span>Banca Online</span>
                    </NavLink>
                    <NavLink to="/users/register" className={`${({isActive}) => isActive ? styles.active : ""} nav-link`}>
                        <span>Solicita tu Producto</span>
                    </NavLink>
                    <NavLink to="/users" className={`${({isActive}) => isActive ? styles.active : ""} nav-link`}>
                        <span>Usuarios</span>
                    </NavLink>
                    <NavLink to="/appointments" className={`${({isActive}) => isActive ? styles.active : ""} nav-link`}>
                        <span>Turnos</span>
                    </NavLink>
                    <NavLink to="/users/:id" className={`${({isActive}) => isActive ? styles.active : ""} nav-link`}>
                        <span>Mis turnos</span>
                    </NavLink>
                    <NavLink to="/contact" className={`${({isActive}) => isActive ? styles.active : ""} nav-link`}>
                        <span>Contacto</span>
                    </NavLink>
                    {/* button */}
                    <NavDropdown title="Menu" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#">Préstamos</NavDropdown.Item>
                        <NavDropdown.Item href="#">Seguros</NavDropdown.Item>
                        <NavDropdown.Item href="#">Inversión</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">Catalogo de puntos</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavBarItems