import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Mobile from "../../assets/Mobile.jpg";
import PlayStoreIcon from "../../assets/PlayStoreIcon.png";
import AppStoreIcon from "../../assets/AppStoreIcon.png";
import styles from "./NewsAPP.module.css";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import NavLink from 'react-bootstrap/esm/NavLink';

function NewsAPP() {
  return (
    <Row xs={1} md={2} className={`${styles.container} g-4 my-1`}>
        <Col>
          <Card>
            <Card.Img variant="top" src={Mobile} fluid="true"/>
          </Card>
        </Col>

        <Col className='d-flex justify-content-center align-items-center'>
          <Card className='border-0'>
            <Card.Body className='display-8 fw-bold'>
              <Card.Title className='display-4 mb-4 fw-bold'>AusA Banca Movil</Card.Title>
              <Card.Text>
                Nuevo servicio de banca móvil: Ahora puedes realizar todas tus transacciones bancarias desde la comodidad de tu dispositivo móvil con nuestra aplicación bancaria actualizada.
              </Card.Text>
            </Card.Body>
            <Col>
              <NavLink>
                <Card.Img className='w-50 m-2' variant="top" src={PlayStoreIcon} fluid="true"/>
              </NavLink>
              <NavLink>
                <Card.Img className='w-50 m-2' variant="top" src={AppStoreIcon} fluid="true"/>
              </NavLink>
            </Col>
          </Card>
        </Col>
    </Row>
  );
}

export default NewsAPP;
