import { AppointmentCheap } from "../config/data-source";
import AppointmentDto from "../dto/Appointment.Dto";
import { Appointment } from "../entities/Appointment";
import IAppointment from "../interfaces/IAppointment";
import IUser from "../interfaces/IUser";
import UsersServices from "./Users.Services";

const getAppointmentsService = async (): Promise<IAppointment[]> => {
    const appointments: Appointment[] = await AppointmentCheap.find({
        // estableso relation @ManyToOne con los appointments
        relations:{
            user: true
        }
    })
    return appointments;
}

const getAppointmentByIdService = async (id: number | undefined): Promise <IAppointment> => {

    const appointmentId = await AppointmentCheap.findOneBy({
        id
    });

    if (!appointmentId || appointmentId === undefined) {
        throw new Error(`El turno con la id ${id} no existe.`);
    }
    else {
        return appointmentId;
    }
}
// aca uso los dto
const addAppointmentService = async (dataAppointment: AppointmentDto): Promise<IAppointment> => {
    // creo el appointment
    const newAppointment : IAppointment = await AppointmentCheap.create(dataAppointment);
    await AppointmentCheap.save(newAppointment);
    
    //obtengo el id del user
    // const userId = await UsersServices.getUserByIdService(dataAppointment.userId);   
    // si el user ya tiene un turno avisar que ya tiene uno
    // const appointment = appointments.find(turn => turn['userId'] === userId.id);
    // if (userId.id && appointment?.id) {
    //     throw new Error(`El usuario ${userId.name} ya tiene el turno ${appointment.id} asignado`);
    // }
    return newAppointment;
}

const cancelAppointmentService = async (dataAppointment: Partial<IAppointment>) => {
    //  busco el turno
    // declaro el tipo de dato como la IAppointment o como undefined x si no encuentra el turno
    //  uso find para que devuelva el turno encontrado en un object, de lo contrario devuelve undefined
    const appointmentIdFound = await getAppointmentByIdService(dataAppointment.id);
    
    // si el turno no existe
    if (!appointmentIdFound || dataAppointment.userId !== appointmentIdFound.userId) {
        throw new Error(`El turno ${dataAppointment.id} para el usuario ${dataAppointment.userId} no existe en el los registros`);       
    }

    if (dataAppointment.status !== undefined) {
        appointmentIdFound.status = dataAppointment.status;
        AppointmentCheap.save(appointmentIdFound);
        return appointmentIdFound;
    }
}
export default {
    getAppointmentsService,
    getAppointmentByIdService,
    addAppointmentService,
    cancelAppointmentService,
}