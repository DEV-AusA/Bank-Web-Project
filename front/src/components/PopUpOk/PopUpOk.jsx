import { useNavigate } from "react-router-dom";
import styles from "./PopUpOk.module.css";
import logoBank from "../../assets/logoBank.png"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

const PopUpOk = (props)  =>{
    
    const navigate = useNavigate();

    const goHome = (event) => {
        event.preventDefault();
        navigate("/");
    }
    

    return (

        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.modalBg}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className={styles.modalHeadBody}>
            <h4>Banco</h4>
            <Image src={logoBank} fluid />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.buttonDetail} onClick={props.onHide}>Volver</Button>
          <Button className={styles.buttonDetail} onClick={goHome}>Ir a pagina principal</Button>
        </Modal.Footer>
      </Modal>

        // <div className={styles.modalDetails}>
        //     <p>{message}</p>
        //         <button className={styles.buttonDetail} onClick={handleOnClose}>Volver</button>
        //         <button className={styles.buttonDetail} onClick={goHome}>Pagina Principal</button>
        // </div>
    )
}

export default PopUpOk