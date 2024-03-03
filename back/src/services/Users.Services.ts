import { UserCheap } from "../config/data-source";
import CredentialDto from "../dto/Credential.Dto";
import UserDto from "../dto/User.Dto";
import { User } from "../entities/User";
import ICredentials from "../interfaces/ICredential";
import IUser from "../interfaces/IUser"
import CredentialsServices from "./Credentials.Services";

export default {
    // agregando la interface UserDto nos aseguramos que el object ingresado cumpla con los datos necesarios para la crear el user
    // y la function al ser de tipo async SIEMPRE debe retornar una promesa Promise<IUser>
    getUsersService: async(): Promise<User[]> => {
        const users: User[] = await UserCheap.find({
            // estableso relation @OneToMany con los appointments
            relations:{
                appointments: true
            }
        })
        return users;
    },
    getUserByIdService: async(id: number): Promise<User> => {

        const userById: User | null = await UserCheap.findOneBy({
            id
        });

        if (!userById) {
            throw new Error(`El usuario con la id ${id} no existe.`);
        }

        return userById;
        
    },
    createUserService: async (userData: UserDto & CredentialDto): Promise<string> => {
        // creo new user completo        
        const newUser: User = await UserCheap.create(userData);
        //save en DB para verificar si existe o no, de lo contraio no se guarda y no se crea ningun credentials
        await UserCheap.save(newUser);        
        // obtengo la credential creada
        const credentials = await CredentialsServices.createUserCredentials(userData);          
        // agrego relation de credential creada
        newUser.credentialsId = credentials;
        //guardo newUser con sus credentials
        await UserCheap.save(newUser);
        return newUser.name
    },
    loginUserService: async (authHeader: string):Promise<void> => {
        // encoding simple
        // aca se desarrollará el login del user
        const encodedCredentials = authHeader.split(' ')[1];
        const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('ascii');
        const [username, password] = decodedCredentials.split(':');
        const dataLog: CredentialDto = { username, password };
        await CredentialsServices.verifyCredentials(dataLog);
    },
    putUserService: async() => {
        //COMIIING SOOON
    },
    // agreggo Promise<void> para avisar que esta function no va a retornar ninguna promise
    deleteUserService: async(id: number): Promise<void> => {
        const userDel = await UserCheap.delete(id);
        if (userDel.affected === 0) throw new Error(`El usuario con la ${id} no existe`);
    },
}