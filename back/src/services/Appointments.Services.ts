import AppointmentDto from "../dto/Appointment.Dto";
import IAppointment from "../interfaces/IAppointment";

// id y array temporal
let id: number = 2;
let appointments: IAppointment[] = [
    {
        id: 1,
        date: "02-06-24",
        time: 1430,
        userId: 1,
        status: true,
    }
];

export default {
    getAppointmentsService: async (): Promise<IAppointment[]> => {
        return appointments;
    },
    getAppointmentByIdService: async (id: number) => {
        
        for( const appo of appointments) {
            if (appo.id == id) {
                return appo;                
            }
        }
    },
    // aca uso los dto
    addAppointmentService: async (dataAppointment: AppointmentDto): Promise<IAppointment> => {
        const newAppointment: IAppointment = {
            id,
            date: dataAppointment.date,
            time: dataAppointment.time,
            userId: dataAppointment.userId,
            status: dataAppointment.status,
        }
        appointments.push(newAppointment);
        id++;
        return newAppointment;
    },
    cancelAppointmentService: async () => {

    },
}