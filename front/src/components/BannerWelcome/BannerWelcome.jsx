import styles from "./BannerWelcome.module.css";
import ImgBanner1 from "../../assets/ImgBanner1.jpg";
import ImgBanner2 from "../../assets/ImgBanner2.jpg";
import ImgBanner3 from "../../assets/ImgBanner3.jpg";
import logoBank from "../../assets/logoBank.png";

import texts from "../../helpers/texts";

import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Button from "react-bootstrap/esm/Button";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import ProductCard from "../Products/ProductCard";
import PopUpOk from "../PopUpOk/PopUpOk";

const BannerWelcome = () => {
    // state para el carousel
    const [index, setIndex] = useState(0);
    //state de activacion de botton si los campos cumplen las validaciones
    const [isValid, setIsValid] = useState(false);

    //automatico +1
    const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    };

    const navigate = useNavigate()
    const goHome = (event) => {
      event.preventDefault();
      navigate("/users/register");
    }

    const goPersonas = (event) => {
      event.preventDefault();
      navigate("/personas");
    }

    //* button modal
    const [modalShow, setModalShow] = useState(false);
    const [message, setMessage] = useState('Solicitud enviada con éxito. Nos pondremos en contacto contigo a la brevedad.')
    // new product Popup
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} className= {styles.carouselItem}>

          <Carousel.Item className= {styles.carouselItem}>
            <Image src={ImgBanner3} fluid />;
            <div className= {styles.overlay}></div>
            <Carousel.Caption className= {` pe-3 ${styles.carouselTextBox}`}>
              <p className="display-9">{texts.tarjetaGoldSpot}</p>
              <h3 className="display-6 my-4">{texts.tarjetaGold}</h3>
              <p className="display-7">{texts.tarjetaGoldFooter}</p>
              <Container fluid className="d-flex mt-5">
                <Button className= {` ${styles.buttonInfo}`} onClick={handleShow}>Pedir mi tarjeta</Button>
                
                <Modal
                  dialogClassName={styles.modalWidth}
                  aria-labelledby="example-custom-modal-styling-title"
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>                    
                    <NavLink to="/" className={`${styles.formAppointmentBanner} mb- text-decoration-none`}>
                      <h1 className="display-4">Banco</h1>
                      <img src={logoBank}/>
                    </NavLink>
                    <div className={styles.formAppointmentBannerText}>
                      <h3>Estamos contigo</h3>
                    </div>
                  </Modal.Header>
                  <Modal.Body className="p-0">
                    {/* Render Solicitud */}
                    <ProductCard />
                    <Form.Check // prettier-ignore
                      className='m-3'
                      type= "checkbox"
                      id= "custom-checkbox"
                      label="Deseo que se comuniquen conmigo."
                    />
                    <Form.Check // prettier-ignore
                        className="m-3"
                        type="switch"
                        id="custom-switch"
                        label="Aceptar Terminos y Condiciones"
                    />
                  </Modal.Body>
                  <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>
                      Cancelar
                    </Button>
                    <Button
                        className={styles.formAppointmentSubmit}
                        // disabled = {!isValid}
                        variant="primary"
                        type="submit"
                        onClick={() => setModalShow(true)}
                        >
                            <span>Enviar Solicitud</span>
                    </Button>     
                        {modalShow && <PopUpOk onHide={() => setModalShow(false)} show={modalShow} message = {message}/>}

                  </Modal.Footer>
                </Modal>
                
                <Button className= {` ${styles.buttonInfo}`} onClick={goPersonas}>Mas info</Button>
              </Container>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item className= {`${styles.carouselItem}`}>
            <Image src={ImgBanner1} fluid />;
            <div className= {styles.overlay}></div>
            <Carousel.Caption className= {` pe-3 ${styles.carouselTextBox}`}>
              <p className="display-9">{texts.productosSpot}</p>
              <h3 className="display-6 my-4">{texts.productos}</h3>
              <p className="display-7">{texts.productosFooter}</p>
              <Container fluid className="d-flex mt-5">
                <Button className= {` ${styles.buttonInfo}`} onClick={goHome}>Registrarme</Button>
                <Button className= {` ${styles.buttonInfo}`} onClick={goPersonas}>Mas info</Button>                
              </Container>
            </Carousel.Caption>
          </Carousel.Item>
          
          <Carousel.Item className= {styles.carouselItem}>
            <Image src={ImgBanner2} fluid />;
            <div className= {styles.overlay}></div>
            <Carousel.Caption className= {` pe-3 ${styles.carouselTextBox}`}>
              <p className="display-9">{texts.viajesSpot}</p>
              <h3 className="display-6 my-4">{texts.viajes}</h3>
              <p className="display-7">{texts.viajesFooter}</p>
              <Container fluid className="d-flex mt-5">
                <Button className= {` ${styles.buttonInfo}`} onClick={goHome}>Solicitar Producto</Button>
                <Button className= {` ${styles.buttonInfo}`} onClick={goPersonas}>Mas info</Button>                
              </Container>
            </Carousel.Caption>
          </Carousel.Item>

        </Carousel>
      );
};
export default BannerWelcome
