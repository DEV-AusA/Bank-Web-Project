import { Router } from "express";
import usersRouter from "./Users.Router";
import appointmentsRouter from "./Appointments.Router";
import consultRouter from "./ConsultRouter.Router";
import embeddingsRouter from "./Embeddings.Router";

// declaro router como tipo interface gracias al modulo npm i -D @types/express
const principalRouter: Router = Router();

principalRouter.use("/users",usersRouter);
principalRouter.use("/appointments", appointmentsRouter);
principalRouter.use("/consult", consultRouter);
principalRouter.use("/embeddings", embeddingsRouter)

export default principalRouter;