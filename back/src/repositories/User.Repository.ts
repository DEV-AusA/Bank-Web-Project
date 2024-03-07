import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const UserRepository = AppDataSource.getRepository(User).extend({
    findUserById: async function (id:number | undefined): Promise<User> {
        // uso .this para referencias las functions propias del repository
        const user = await this.createQueryBuilder("user")
                                .leftJoinAndSelect("user.appointments", "appointments")
                                .where("user.id = :id", { id })
                                .getOne();
        if(user) return user;
        else throw ({
            message: `No se encontró al usuario con la id ${id}`,
            code: 404,
            error: "Invalid ID"
        });
    },
    createNewUser: async function(params: string) {
        
    },
    checkUserEmail: async function (email: string):Promise<boolean> {
        const userEmail = await this.findOneBy({ email });
        if(!userEmail) return !userEmail;
        throw ({
            message: `Ya existe un usuario registrado con el mail ${email}.`,
            code: 400,
            status: "Invalid Email"
        });
    },
    checkUserDni: async function(nDni: number): Promise<boolean> {
        const userDni = await this.findOneBy({ nDni })
        if(!userDni) return !userDni
        throw ({
            message: `Ya existe un usuario registrado con el DNI ${nDni}.`,
            code: 400,
            status: "Invalid Document Number"
        });

        
    }
});
export default UserRepository