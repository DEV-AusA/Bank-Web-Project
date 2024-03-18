import { useEffect, useState } from "react"
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import styles from "./MisTurnos.module.css"
import { useNavigate, useParams } from "react-router-dom";

import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { UserAppointments } from "../../Redux/userSlice";

const MisTurnosUserDetail = () => {
    // login de user
    const loggedInUsers = useSelector(state => state.users.userDataLogin);
    // appointments de user
    const appointmentsUser = useSelector(state => state.users.userDataAppointments);

    const navigate = useNavigate();
    // guardo los dispatch dentro de reducers
    const dispatch = useDispatch();
    // adornar hora
    const formatHour = (hour) => {
      const hourString = hour.toString();        
      const formattedHour = hourString.slice(0, 2) + ':' + hourString.slice(2); // divido los 4 digitos en 2  al principio y aumento los ":" 
      return formattedHour;
    }

    // mandar al home si el loggedInUsers es false
    useEffect(() => {
        if (!loggedInUsers.login) {
            navigate("/");
        }
    }, [loggedInUsers.login, navigate]);

    // const [appointments, setAppoinments] = useState([]);
    // const [userName, setUserName] = useState('');
    // useParams lee el /:id del patch
    const { id } = useParams();    

    useEffect(() => {

        const userAppoinmentsFetch = async () => {
          try {
            const response = await fetch(`http://localhost:3000/users/${id}`);
            const data = await response.json();
            // si esta logueado cargo datos sino no
            //guardo los appointments en el state global de appointments
            dispatch(UserAppointments(data.appointments));
            // setAppoinments(data.appointments);
            // setUserName(data.name);
          } catch (error) {
            console.error("Error al obtener los datos de la DB:", error);
            // setAppoinments(error.data)
          }
        };
      
        userAppoinmentsFetch();
        
    }, []);

    return loggedInUsers.login ? (
        <Container  className={styles.container}>
            <h1>Turnos de {loggedInUsers.user.name}</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Turno Nro</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Usuario ID</th>
                  <th className="col-2 text-center">Estado del turno</th>
                  <th className="col-2 text-center">Accion</th>
                </tr>
              </thead>
              <tbody>
                { appointmentsUser.map((turno) => {
                    return (
                        <tr key={turno.id} className={styles.misturnoscard}>
                            <AppointmentCard
                                id={turno.id}
                                date={turno.date}
                                time={formatHour(turno.time)}
                                userId={turno.userId}
                                status={turno.status}
                            />
                        </tr>
                    )
                })}
              </tbody>
            </Table>
        </Container> 
    ) : null;
}

export default MisTurnosUserDetail