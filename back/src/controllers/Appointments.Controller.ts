import { Request, Response } from "express";
import IAppointment from "../interfaces/IAppointment";
import AppointmentsServices from "../services/Appointments.Services";
import catchAsync from "../utils/catchAsync";
import formatHour from "../utils/FormatHour";



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
    // status,
  });
  const timeAppo = formatHour(appointment.time);

  res.status(201).json({
    message: `Turno creado correctamente para el dia ${appointment?.date} a las ${timeAppo}`,
  });
};
// en el req pongo el tipo de dato a recibir y que solamente usara parcialmente algunos datos de la interface IAppointment  <{id: string}, Partial<IAppointment>>
const cancelAppointment = async (req: Request, res: Response) => {
  //obtengo  id de la URL
  const { id } = req.params;
  // obtengo los datos del body
  const { userId, status } = req.body; 
    const appointment = await AppointmentsServices.cancelAppointmentService(Number(id), userId, status);
    const timeAppo = formatHour(appointment.time);
    res.status(200).json({
      message: `El turno con fecha ${appointment.date} para las ${timeAppo} fue cancelado correctamente`
    });     

};

export default {
  getAppointments: catchAsync(getAppointments),
  getAppointmentById: catchAsync(getAppointmentById),
  addAppointment: catchAsync(addAppointment),
  cancelAppointment: catchAsync(cancelAppointment),
};
