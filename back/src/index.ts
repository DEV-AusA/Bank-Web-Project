import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { preloadAppointmentsData, preloadCredentialsData, preloadUsersData } from "./helpers/Preload.Data";
import * as pgvector from 'pgvector/pg';

async function serverOn() {
  try {
    //conecto con la DB llamando a la function AppDataSource de data-source
    await AppDataSource.initialize();

    //creo la extension vector si no existe
    await AppDataSource.query('CREATE EXTENSION IF NOT EXISTS vector');
    // creara la tabla solo si no existe
    await AppDataSource.query('DROP TABLE IF EXISTS embedding_products');
    await AppDataSource.query('CREATE TABLE embedding_products (id bigserial PRIMARY KEY, product TEXT NOT NULL, product_embedding vector(768), suggestions_use TEXT NOT NULL, suggestions_use_embedding vector(768))');

    console.log("Conexion a la base de datos realizada con exito");
    await preloadUsersData();
    await preloadCredentialsData();
    await preloadAppointmentsData();
    server.listen(PORT, () => {
      console.log(
        `Jarvis operativo y atento señor, en guardia mediante sus ${PORT} millones de neurotransmisores`
      );
    });
  } catch (error) {
    console.error("Error al inicializar el servidor:", error);
  }
}
// levanto el server
serverOn();
