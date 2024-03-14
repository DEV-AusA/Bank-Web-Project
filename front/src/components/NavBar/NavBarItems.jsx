import styles from "./NavBarItems.module.css"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from "react-router-dom";

const NavBarItems = () => {
    return(
        <div className={styles.navbarItems}>
            <ul>
                <li>
                    <NavLink to="/productsempresas" className={({isActive}) => isActive ? styles.active : ""}>
                        <span>Empresas</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/personas" className={({isActive}) => isActive ? styles.active : ""}>
                        <span>Personas</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login" className={({isActive}) => isActive ? styles.active : ""}>
                        <span>Banca Online</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users/register" className={({isActive}) => isActive ? styles.active : ""}>
                        <span>Solicita tu Producto Online</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users" className={({isActive}) => isActive ? styles.active : ""}>
                        <span>Usuarios</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/appointments" className={({isActive}) => isActive ? styles.active : ""}>
                        <span>Turnos</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users/:id" className={({isActive}) => isActive ? styles.active : ""}>
                        <span>Mis turnos</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={({isActive}) => isActive ? styles.active : ""}>
                        <span>Contacto</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
// const NavBarItems = () => {
//     return(
//         <div className={styles.navbarItems}>
//         <Navbar bg="primary" data-bs-theme="dark">
//             <Container>
//             <Navbar.Brand href="#home">Personas</Navbar.Brand>
//             <Navbar.Brand href="#home">Empresas</Navbar.Brand>
//             <Nav className="me-auto">
//                 <Nav.Link href="#home">Banca Online</Nav.Link>
//                 <Nav.Link href="#home">Solicita tu Tarjeta Online</Nav.Link>
//                 <Nav.Link href="#home">Contacto</Nav.Link>
//             </Nav>
//             </Container>
//         </Navbar>
//         </div>
//     )
// }
export default NavBarItems