import { AppDataSource } from "../config/data-source";
import CredentialDto from "../dto/Credential.Dto";
import UserDto from "../dto/User.Dto";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import ICredentials from "../interfaces/ICredential";
import UserRepository from "../repositories/User.Repository";
import CredentialsServices from "./Credentials.Services";

export default {
    // agregando la interface UserDto nos aseguramos que el object ingresado cumpla con los datos necesarios para la crear el user
    // y la function al ser de tipo async SIEMPRE debe retornar una promesa Promise<IUser>
    getUsersService: async(): Promise<User[]> => {
        const users: User[] = await UserRepository.find({
            // estableso relation @OneToMany con los appointments
            relations:{
                appointments: true
            }
        })
        // Ordena la lista de usuarios por su ID
        users.sort((a, b) => a.id - b.id);
        return users;
    },
    getUserByIdService: async(id: number): Promise<User> => {
        // repository custom
        const userById: User = await UserRepository.findUserById(id)
        return userById;        
    },
    createUserService: async (userData: UserDto & CredentialDto): Promise<User> => {
        const queryRunner = AppDataSource.createQueryRunner();
        queryRunner.connect()
        
        // creo new user completo        
        const newUser: User = await UserRepository.create(userData);
        
        try {
            await queryRunner.startTransaction();
            // check si existe el email y dni
            await UserRepository.checkUserEmail(userData.email);
            await UserRepository.checkUserDni(userData.nDni);
            
            //check username y creo las credentials
            const credentials: Credential = await CredentialsServices.createUserCredentialsService(userData);
            newUser.credentialsId = credentials;
            //save newUser con sus credentials en DB para verificar si existe o no, de lo contraio no se guarda y no se crea ningun credentials
            await queryRunner.manager.save(newUser);
            
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally{
            await queryRunner.release();
        }

        return newUser
    },
    loginUserService: async (loginData : CredentialDto): Promise<User> => {
        
        try {
            const userId = await CredentialsServices.verifyCredentialsService(loginData);
            
            if (userId) {
                const user = await UserRepository.findOneBy({ id: userId });
                if (user) {
                    return user;
                } else {
                    throw new Error('No se encontró al usuario');
                }
            } else {
                throw new Error('Credenciales inválidas');
            }
            
        } catch (error) {
            throw error
        }
    },
    putUserService: async() => {
        //COMIIING SOOON
    },
    // agreggo Promise<void> para avisar que esta function no va a retornar ninguna promise
    deleteUserService: async(id: number): Promise<void> => {
        const userDel = await UserRepository.delete(id);
        if (userDel.affected === 0) throw new Error(`El usuario con la ${id} no existe`);
    },
}