import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatIA.module.css';
import logoBank from "../../assets/logoBank.png";
import { useDispatch, useSelector } from 'react-redux';
import { receiveMessage, sendMessage } from '../../Redux/chatSlice';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';



const ChatIA = () => {

  const containerRef = useRef(null);

  const dispatch = useDispatch();
  const messagesAI = useSelector(state => state.chat.messagesAI);

  const [showA, setShowA] = useState(true);
  const [formData, setFormData] = useState({
    prompt: '',
  });

  // Función para desplazar el textarea al final
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  // btn activacion windows chat
  const toggleShowA = () => setShowA(!showA);
  // input de prompt
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesAI]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      const response = await fetch(`http://localhost:3000/consult`,  {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud es JSON
          },
          body: JSON.stringify(formData) // Convierte el objeto requestBody a JSON
      });
      const resIA = await response.json();

      // Actualizar el estado con los mensajes intercalados
      dispatch(sendMessage({ text: formData.prompt, sender: 'user' }));
      dispatch(receiveMessage({ text: resIA, sender: 'server' }));
       
      setFormData({ prompt: '' });
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  }

  return (
    <Row className={`${styles.chatBox} position-fixed bottom-0 end-0 m-2`}>
        <Col md={8} className="mb-2 w-auto">
        <Button onClick={toggleShowA} className="mb-2">
          <strong>Preguntame!</strong>
        </Button>
        <Toast show={showA} onClose={toggleShowA} className={`mw-100`}>
          <Toast.Header>
            <strong className="me-auto">Banco</strong>
            <img
              src={logoBank}
              className="rounded me-2 w-25"
              alt=""
            />
            <small>Online</small>
          </Toast.Header>
          <Toast.Body>
            <FloatingLabel className={`${styles.chatWindow}`} ref={containerRef}>
              { messagesAI.map((message, index) => (
              <p key={index}
                className={`${message.sender === 'user' ? styles.userMessage : styles.serverMessage}`}
              >
                {message.text}
              </p>
              ))}
            </FloatingLabel>
          </Toast.Body>
          <NavDropdown.Divider className='' />
          <Modal.Footer className='m-2'>
            <Form className='w-100' onSubmit={handleSubmit}>
              <Form.Control
                type='text'
                name='prompt'
                onChange={handleInputChange}
                placeholder='¿que necesitas saber?'
                value={formData.prompt}
                className="rounded-0"
              />
              <Button type='submit' className= "m-2">enviar</Button>
            </Form>
        </Modal.Footer>
        </Toast>
      </Col>
    </Row>
  );
};

export default ChatIA;
