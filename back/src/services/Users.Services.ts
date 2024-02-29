import UserDto from "../dto/User.Dto";
import IUser from "../interfaces/IUser"

// temporal hasta usar datos de una DB
let users: IUser[] = [
    {
        id: 1,
        name: "Cesar",
        email: "cesar@gmail.com",
        birthdate: "04-01-1989",
        nDni: 94123456,
        credentialsId: 1,
    }
];
// uso id temporal
let id: number = 2

export default {

    // agregando la interface UserDto nos aseguramos que el object ingresado cumpla con los datos necesarios para la crear el user
    // y la function al ser de tipo async SIEMPRE debe retornar una promesa Promise<IUser>
    getUsersService: async(): Promise<IUser[]> => {
        return users;
    },
    getUserByIdService: async(id: number) => {
        
        for( const user of users) {
            if (user.id == id) {
                return user;                
            }
        }
        
    },
    createUserService: async (userData: UserDto): Promise<IUser> => {

        const newUser: IUser = {
            id,
            name: userData.name,
            email: userData.email,
            birthdate: userData.birthdate,
            nDni: userData.nDni,
            credentialsId: userData.credentialsId,
        }
        // pusheo al array temporal
        users.push(newUser);
        id++;
        return newUser
    },
    loginUserService: async (authHeader: string) => {
        // aca se desarrollará el login del user
        const encodedCredentials = authHeader.split(' ')[1];
        const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('ascii');
        const [username, password] = decodedCredentials.split(':');
        console.log('Username:', username);
        console.log('Password:', password);            
    },
    putUserService: async() => {
        //
    },
    // agreggo Promise<void> para avisar que esta function no va a retornar ninguna promise
    deleteUserService: async(id: number): Promise<void> => {
        // el filter crea un nuevo array que contiene todos los usuarios del array original users, excepto el que no coincide con el id proporcionado.
        users = users.filter((user: IUser) => {
            return user.id !== id   
        });        
    },
}