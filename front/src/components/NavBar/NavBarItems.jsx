import styles from "./NavBarItems.module.css"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBarItems = () => {
    return(
        <div className={styles.navbarItems}>
            <ul>
                <li><a href="">Personas</a></li>
                <li><a href="">Empresas</a></li>
                <li><a href="">Banca Online</a></li>
                <li><a href="">Solicita tu Tarjeta Online</a></li>
                <li><a href="">Contacto</a></li>
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