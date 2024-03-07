import { AppDataSource } from "../config/data-source";
import AppointmentDto from "../dto/Appointment.Dto";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import IAppointment from "../interfaces/IAppointment";
import AppointmentRepository from "../repositories/Appointment.Repository";
import UserRepository from "../repositories/User.Repository";

const getAppointmentsService = async (): Promise<IAppointment[]> => {
    const appointments: Appointment[] = await AppointmentRepository.find({
        // estableso relation @ManyToOne con los appointments
        relations:{
            user: true
        }
    })
    if(appointments.length) {
        return appointments;
    }
    else throw ({
        message: "No se encontraron turnos.",
        code: 404,
        status: "NOT FOUND"
    })
}

const getAppointmentByIdService = async (id: number): Promise <Appointment> => {
    // custom repository
    const appointment = await AppointmentRepository.findAppointmentById(id)
        return appointment;
}
// aca uso los dto
const addAppointmentService = async (dataAppointment: AppointmentDto): Promise<Appointment> => {
    const queryRunner = AppDataSource.createQueryRunner()

    queryRunner.connect()

    try {
        queryRunner.startTransaction();
        // verifico el user
        const user = await UserRepository.findOneBy({
            id: dataAppointment.userId
        });
        if(!user)
        throw ({
            message: "No se pudo asignar el turno porque no se encontró al usuario",
            code: 400,
            error: "Invalid ID"
        })
        const newAppointment : Appointment = await AppointmentRepository.create(dataAppointment);
        await queryRunner.manager.save(newAppointment);
        // fin de la transaction
        await queryRunner.commitTransaction();

        return newAppointment;
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
    }
    finally{
        await queryRunner.release()
    }
}
const cancelAppointmentService = async (idApp: number, userId: number, status: boolean): Promise<Appointment> => {
// const cancelAppointmentService = async (id: number, dataAppointment: Partial<AppointmentDto>): Promise<Appointment> => {
    const queryRunner = AppDataSource.createQueryRunner();
    queryRunner.connect();

    try {
        queryRunner.startTransaction();
        // verifico que el turno coincida con el del user
        const appointmentWithUser = await AppointmentRepository.findAppointmentWithUser(idApp, userId)
        // busco turno por id
        const appointment: Appointment = await getAppointmentByIdService(idApp);
        // si coinciden el turno asignado con el del que tiene el user y si status esta definido
        if (appointmentWithUser && status !== undefined) {
            // const user: User = await UserRepository.findUserById(userId)
            appointment.status = status;
            await queryRunner.manager.save(appointment);
        }
        await queryRunner.commitTransaction();
        return appointment;
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
    }
    finally {
        await queryRunner.release();
    }
}
export default {
    getAppointmentsService,
    getAppointmentByIdService,
    addAppointmentService,
    cancelAppointmentService,
}