import { Request, Response } from "express";
import IAppointment from "../interfaces/IAppointment";
import AppointmentsServices from "../services/Appointments.Services";
import catchAsync from "../utils/catchAsync";



const getAppointments  = async (req: Request, res: Response) => {
  const appointments = await AppointmentsServices.getAppointmentsService();
  res.status(200).json(appointments);
};

const getAppointmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const appointment = await AppointmentsServices.getAppointmentByIdService(Number(id));
  res.status(200).json(appointment);
};

const addAppointment = async (req: Request, res: Response) => {
  const { date, time, userId, status } = req.body;

  const appointment = await AppointmentsServices.addAppointmentService({
    date,
    time,
    userId,
    status,
  });
  res.status(201).json({
    message: `Turno Nro ${appointment.id} creado correctamente para el dia ${appointment.date} a las ${appointment.time}`,
  });
};
// en el req pongo el tipo de dato a recibir y que solamente usara parcialmente algunos datos de la interface IAppointment  <{id: string}, Partial<IAppointment>>
const cancelAppointment = async (req: Request <{id: string}, Partial<IAppointment>>, res: Response) => {
  //obtengo  id de la URL
  const { id } = req.params;
  // obtengo los datos del body
  const { userId, status } = req.body;

  try {      
    // verifico que ingrese algun valor, y el status no enviado al ser undefined lo filtro como condicion
    if (!id || !userId || status === undefined) {
      throw new Error("Falta algun dato");
    }
    
    const appointmentFound = await AppointmentsServices.cancelAppointmentService({ id: Number(id), userId, status});

    res.status(200).json({
      message: `El turno ${appointmentFound?.id} ha sido cancelado correctamente`
    });  
    
  } catch (error) {
    // muestro el error en la consola
    console.error(error);
    res.status(500).json({
      message: `Algun dato es erróneo o el turno ${id} para ese usuario no existe en los registros`
    });
  }

};

export default {
  getAppointments: catchAsync(getAppointments),
  getAppointmentById: catchAsync(getAppointmentById),
  addAppointment: catchAsync(addAppointment),
  cancelAppointment,
};
