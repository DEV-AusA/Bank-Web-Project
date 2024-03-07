import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import UserRepository from "./User.Repository";

const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({

    findAppointmentById: async function(id: number): Promise<Appointment> {
        const appointment = await this.findOneBy({ id });
        if(appointment) return appointment;
        else throw ({
            message: `No se encontró al turno con la id ${id}`,
            code: 404,
            error: "Invalid ID"
        });        
    },
    findAppointmentWithUser: async function(idApp:number, idUser: number): Promise<Boolean> {
        const appointment: Appointment = await this.findAppointmentById(idApp);
        const user: User = await UserRepository.findUserById(idUser);

        if (appointment.userId === user.id) return true;
        else throw ({
            message: `El turno para el usuario no existe en el los registros`,
            code: 404,
            status: "Invalid ID user or ID appointment"
        }); 
    }
});
export default AppointmentRepository