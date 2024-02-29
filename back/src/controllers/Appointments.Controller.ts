import { Request, Response } from "express";
import IAppointment from "../interfaces/IAppointment";
import AppointmentsServices from "../services/Appointments.Services";

export default {
  getAppointments: async (req: Request, res: Response) => {
    const appointments = await AppointmentsServices.getAppointmentsService();
    res.status(200).json(appointments);
  },
  getAppointmentById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const appointment = await AppointmentsServices.getAppointmentByIdService(parseInt(id));
    res.status(200).json(appointment);
  },
  addAppointment: async (req: Request, res: Response) => {
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
  },
  cancelAppointment: async (req: Request, res: Response) => {

  },
};
