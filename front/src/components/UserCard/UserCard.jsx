import { Link } from "react-router-dom";
import styles from "./UserCard.module.css";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const UserCard = ({id, name, email, birthdate, nDni, userId}) => {

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Ver turnos
        </Tooltip>
      );

    return (
            <>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{birthdate}</td>
                <td>{nDni}</td>
                <td>
                <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
                >
                    <Link to={`/users/${userId}`} className={styles.appointments} variant="success">Turnos</Link>
                </OverlayTrigger>
                </td>

            </>
    )
}

export default UserCard