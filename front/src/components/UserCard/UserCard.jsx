import { Link } from "react-router-dom"
import styles from "./UserCard.module.css"

const UserCard = ({id, name, email, birthdate, nDni, userId}) => {

    return (
            <>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{birthdate}</td>
                <td>{nDni}</td>
                <td><Link to={`/users/${userId}`} className={styles.appointments}>Turnos</Link></td>
            </>
    )
}

export default UserCard