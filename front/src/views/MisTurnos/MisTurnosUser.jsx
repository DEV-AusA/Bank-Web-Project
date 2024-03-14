import { Link } from "react-router-dom"
import User from "./User"

const MisturnosUser = ({appoinments}) => {
    return(
        <div>
            {appoinments.map((appointment) => {
                // ruta dinamica to= "endpoint"
                <Link key={appointment.id} to={`/users/${appointment.id}`}>
                    <User key={appointment.id} appointment={appointment} />
                </Link>
            })}
        </div>
    )
    
}

export default MisturnosUser