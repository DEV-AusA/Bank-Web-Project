import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Credential } from "../entities/Credential"
import { Appointment } from "../entities/Appointment"
import { UserQuestion } from "../entities/UserQuestion"
import { EmbeddingProduct } from "../entities/EmbeddingProduct"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin04",
    database: "ausa_bank",
    dropSchema: true, // <= esta propiedad borra toda la DB si esta activado
    synchronize: true,
    logging: false, // ["error"], <= solo muestre errores de la DB
    entities: [User, Credential, Appointment, EmbeddingProduct],
    subscribers: [],
    migrations: [],
})