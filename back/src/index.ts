import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
// conecto con la DB
AppDataSource.initialize()
// si se conectó levanto el server
.then(res => {
  console.log("Conexion a la base de datos realizada con exito");  
  server.listen(PORT, () => {
    console.log(
      `Jarvis operativo y atento señor, en guardia mediante sus ${PORT} millones de neurotransmisores`
    );
  });
})
