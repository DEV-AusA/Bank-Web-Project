import { Router } from "express";
import usersRouter from "./Users.Router";
import appointmentsRouter from "./Appointments.Router";

// declaro router como tipo interface gracias al modulo npm i -D @types/express
const principalRouter: Router = Router();

principalRouter.use("/users",usersRouter);
principalRouter.use("/appointments", appointmentsRouter)

export default principalRouter;