import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import styles from "./Contact.module.css"
import PopUpOk from '../../components/PopUpOk/PopUpOk';
import { useState } from 'react';

function Contact() {

    //* button modal
    const [modalShow, setModalShow] = useState(false);
    const [ submit, setSubmit ] = useState(false);

    const [message, setMessage] = useState('Formulario enviado. ¡Muchas gracias!');

    const handleOnSubmit = (event) => {
        event.preventDefault();
        setSubmit(true)
    }

  return (
    <Container className='my-5'>
        <h1 className='my-4'>Tu opinión nos importa</h1>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control type="text" placeholder="Por ejemplo Cesar Ausa" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Numero de cuenta</Form.Label>
                <Form.Control type="text" placeholder="Por ejemplo: 150-050-1234567" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Cuentanos el motivo de tu consulta:</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Agregar algun archivo: </Form.Label>
            <Form.Control type="file" />

            <Form.Check // prettier-ignore
            className='mt-3'
            type= "checkbox"
            id= "custom-checkbox"
            label="Deseo que se comuniquen conmigo."
          />
            <Form.Check // prettier-ignore
                className="mt-3"
                type="switch"
                id="custom-switch"
                label="Aceptar Terminos y Condiciones"
            />
        </Form.Group>
        <Button
            className={styles.contactSubmit}
            variant="primary"
            type="submit"
            onClick={() => {
                setModalShow(true);
                setSubmit(true);
            }}
            >
                <span>Enviar solicitud</span>
        </Button>
        {submit && <PopUpOk onHide={() => setModalShow(false)} show={modalShow} message = {message}/>}   
      </Form>
    </Container>
  );
}

export default Contact;