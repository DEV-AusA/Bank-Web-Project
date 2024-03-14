import { useEffect, useState } from "react"
import UserCard from "../../components/UserCard/UserCard";
import styles from "./User.module.css"

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
          try {

            const response = await fetch(`http://localhost:3000/users`,{
                method: 'GET',
                headers: {
                    'token': 'autenticado'
                  }
            });

            const data = await response.json();
            setUsers(data);
          } catch (error) {
            console.error("Error al obtener los datos de la DB:", error);
          }
        };
      
        fetchData();
        
    }, []); 
    
    return (
        <div className={styles.container}>
            <h1>Bienvenido al gestor de usuarios</h1>
            <div className={styles.table}>
                <span>User ID</span>
                <span>Nombre</span>
                <span>Email</span>
                <span>Fecha de Nacimiento</span>
                <span>Numero de DNI</span>
                <span>Turnos</span>
            </div>
                { users.map((user) => {
                    return (
                        <div key={user.id} >
                            <UserCard
                            id={user.id}
                            name={user.name}
                            email={user.email}
                            birthdate={user.birthdate}
                            nDni={user.nDni}
                            userId = {user.id}
                            // appointments={user.appointments}
                            />
                        </div>
                    )
                })}
        </div>
    )
}

export default Users