import { AppDataSource } from "../config/data-source";
import { EmbeddingProduct } from "../entities/EmbeddingProduct";
import AppointmentRepository from "../repositories/Appointment.Repository";
import CredentialRepository from "../repositories/Credential.Repository";
import UserRepository from "../repositories/User.Repository";
import { preloadAppointments } from "./Appointments.Data";
import { preloadCredentials } from "./Credentials.Data";
import { preloadProducts } from "./Products.Data";
import { preloadUsers } from "./Users.Data";

export const preloadUsersData = async () => {
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {

        const users = await UserRepository.find();
        
        if(users.length) return console.log(`No se hizo precarga de datos porque ya hay ${users.length} datos cargados`);
        // users
        for await(const user of preloadUsers) {
            const newUser = await UserRepository.create(user);
            await transactionalEntityManager.save(newUser);
        }
        // credentials
        for await(const credential of preloadCredentials) {
            const newCredential = await CredentialRepository.create(credential);
            await transactionalEntityManager.save(newCredential);
        }
        //products
        for await (const product of preloadProducts){
            // esta variable instancia el AppDataSource y el metodo getRepository pasandole como parametro la entity User
            const newProduct = await AppDataSource.getRepository(EmbeddingProduct).create(product);
            await transactionalEntityManager.save(newProduct);
        }

        console.log("Precarga de Usuarios del Preload realizada con éxito");        
    })
}

export const preloadAppointmentsData = async() => {

    const queryRunner = AppDataSource.createQueryRunner();

    queryRunner.connect();
    // conviertiendo el array de objects en un array de promises
    const appointmentPromises = preloadAppointments.map(async (appoo) => {
        const newAppointment = await AppointmentRepository.create(appoo);
        await queryRunner.manager.save(newAppointment);
        // verifico user
        const user = await UserRepository.findOneBy({
            id: appoo.userId
        });
        // si es false
        if(!user) throw new Error ("Usuario inexistente");
        // sino cargo turno a user
        newAppointment.user = user;
        await queryRunner.manager.save(newAppointment);
    })
    try {
        // init transaction
        await queryRunner.startTransaction();
        // le paso el array de promises
        await Promise.all(appointmentPromises);
        // finish/confirm  transaction
        await queryRunner.commitTransaction();
        console.log("Precarga de Apponitments del Preload realizada con exito");      
    } catch (error) {
        console.log("Error al intentar crear los Apponitments del Preload, reciclando datos innecesarios");
        // Volviendo al pasado...
        await queryRunner.rollbackTransaction()        
    }
    finally{
        console.log(`Ha finalizado el intento de precarga`);
        // liberen a Willy
        await queryRunner.release()
    }
}
export const preloadCredentialsData = async() => {
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
        
        const users = await UserRepository.find();
        // create & save de preloadUsers
        for await(const user of users) {
            const credential = await CredentialRepository.findOneBy({ id: user.id});
            if(credential)
            user.credentialsId = credential;
            await transactionalEntityManager.save(user);
        }
        console.log("Precarga de Credentials del Preload realizada con éxito");
            
    })
}