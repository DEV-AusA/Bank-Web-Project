import styles from "./BannerWelcome.module.css";
import ImgBanner1 from "../../assets/ImgBanner1.jpg";
import ImgBanner2 from "../../assets/ImgBanner2.jpg";
import ImgBanner3 from "../../assets/ImgBanner3.jpg"
import texts from "../../helpers/texts"

import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Button from "react-bootstrap/esm/Button";
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";

const BannerWelcome = () => {
    // state para el carousel
    const [index, setIndex] = useState(0);
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

    return (
        // <Carousel activeIndex={index} onSelect={handleSelect} className= {styles.carouselItem}>
        <Carousel activeIndex={index} onSelect={handleSelect} className= {styles.carouselItem}>
          <Carousel.Item className= {`${styles.carouselItem}`}>
            <Image src={ImgBanner1} fluid />;
            <div className= {styles.overlay}></div>
            <Carousel.Caption className= {` pe-3 ${styles.carouselTextBox}`}>
              <p className="display-9">{texts.productosSpot}</p>
              <h3 className="display-6 my-4">{texts.productos}</h3>
              <p className="display-7">{texts.productosFooter}</p>
              <Container fluid className="d-flex justify-content-end mt-4">
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
              <Container fluid className="d-flex justify-content-end mt-4">
                <Button className= {` ${styles.buttonInfo}`} onClick={goHome}>Solicitar Producto</Button>
                <Button className= {` ${styles.buttonInfo}`} onClick={goPersonas}>Mas info</Button>                
              </Container>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item className= {styles.carouselItem}>
            <Image src={ImgBanner3} fluid />;
            <div className= {styles.overlay}></div>
            <Carousel.Caption className= {` pe-3 ${styles.carouselTextBox}`}>
              <p className="display-9">{texts.tarjetaGoldSpot}</p>
              <h3 className="display-6 my-4">{texts.tarjetaGold}</h3>
              <p className="display-7">{texts.tarjetaGoldFooter}</p>
              <Container fluid className="d-flex justify-content-end mt-4">
                <Button className= {` ${styles.buttonInfo}`} onClick={goHome}>Pedir mi tarjeta</Button>
                <Button className= {` ${styles.buttonInfo}`} onClick={goPersonas}>Mas info</Button>                
              </Container>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
    
    return (
        <div className={styles.sliderContainer}>
            <div className={styles.slider}>
                <div className={styles.slides}>
                    <div id="slides-1" className={styles.slide}>
                        <span className={styles.slideText}><img src={imgBanner1} alt="" />{texts.productos}</span>
                    </div>
                    <div id="slides-2" className={styles.slide}>
                        <span className={styles.slideText}><img src={imgBanner2} alt="" /></span>
                    </div>
                    <div id="slides-3" className={styles.slide}>
                        <span className={styles.slideText}><img src={imgBanner1} alt="" /></span>
                    </div>
                    <div id="slides-4" className={styles.slide}>
                        <span className={styles.slideText}><img src={imgBanner2} alt="" /></span>
                    </div>
                </div>
                <div className={styles.sliderNav}>
                    <a className={styles.sliderNavLink} href="#slides-1"></a>
                    <a className={styles.sliderNavLink} href="#slides-2"></a>
                    <a className={styles.sliderNavLink} href="#slides-3"></a>
                    <a className={styles.sliderNavLink} href="#slides-4"></a>
                </div>
            </div>
        </div>
    );
};
export default BannerWelcome
