import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Credential } from "../entities/Credential"
import { Appointment } from "../entities/Appointment"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin04",
    database: "ausa_bank",
    dropSchema: true, // <= esta propiedad borra toda la DB si esta activado
    synchronize: true,
    logging: ["error"], // <= solo muestre errores de la DB
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
})

// Ahorra tipeos XD
export const AppointmentCheap = AppDataSource.getRepository(Appointment);
export const CredentialCheap = AppDataSource.getRepository(Credential);
export const UserCheap = AppDataSource.getRepository(User);