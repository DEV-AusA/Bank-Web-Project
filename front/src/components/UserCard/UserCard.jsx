import { Link } from "react-router-dom"
import styles from "./UserCard.module.css"

const UserCard = ({id, name, email, birthdate, nDni, userId}) => {

    return (
            <div className={styles.table}>
                <span>{id}</span>
                <span>{name}</span>
                <span>{email}</span>
                <span>{birthdate}</span>
                <span>{nDni}</span>
                <Link to={`/users/${userId}`}>Turnos</Link>
            </div>
    )
}

export default UserCard