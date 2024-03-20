import { Router } from "express";
import AppointmentsController from "../controllers/Appointments.Controller";
import ValidateAddAppointment from "../middlewares/Validate.AddAppointment";

// declaro router como tipo interface gracias al modulo npm i -D @types/express
const appointmentsRouter: Router = Router();

// Obtener el listado de todos los turnos de todos los usuarios.
appointmentsRouter.get("/", AppointmentsController.getAppointments);
// Obtener el detalle de un turno específico.
appointmentsRouter.get("/:id", AppointmentsController.getAppointmentById);
// Agendar un nuevo turno.
appointmentsRouter.post("/schedule", ValidateAddAppointment.ValidateAddAppointment, AppointmentsController.addAppointment);
// Cambiar el estatus de un turno a “cancelled”.
appointmentsRouter.put("/cancel/:id", AppointmentsController.cancelAppointment);

export default appointmentsRouter
