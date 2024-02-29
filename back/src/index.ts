import server from "./server";
import { PORT } from "./config/envs";

server.listen(PORT, () => {
  console.log(
    `Jarvis operativo y atento señor, escuchando mediante sus ${PORT} millones de neurotransmisores`
  );
});
