import express, { NextFunction, Request, Response } from "express"
import router from "./routes/Principal.Router"

const server = express();

// para convertir los datos recibidos y enviados a formato JSON
server.use(express.json());

server.use(router);
server.use((err: { message: string }, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: err.message });
});

export default server;
