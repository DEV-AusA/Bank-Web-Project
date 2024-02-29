import { Request, Response } from "express";
import usersServices from "../services/Users.Services";
import IUser from "../interfaces/IUser";

export default {
    getUsers: async (req: Request, res: Response) => {
        const users: IUser[] = await usersServices.getUsersService();
        res.status(200).json(users);
    },
    getUserById: async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await usersServices.getUserByIdService(parseInt(id))
        res.status(200).json(user);
    },
    //  que el import de las interfaces para req y res sean de EXPRESS Y NO DE OTRA DEPENDENCIA
    createUser: async (req: Request, res: Response) => {

        const { name, email, birthdate, nDni, credentialsId} = req.body;
        // agrego a la variable el tipo interface : IUser, y envio como object las propiedades destructuradas
        const newUser: IUser = await usersServices.createUserService({name, email, birthdate, nDni, credentialsId});
        res.status(201).json(newUser)

    },
    loginUser: async (req: Request, res: Response) => {

        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new Error('Credenciales no proporcionadas.');
            }

            await usersServices.loginUserService(authHeader);            
            res.status(200).json({
                message: 'Credenciales recibidas correctamente.'
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al procesar las credenciales.');
        }
    },
    putUser: async() => {
        
    },
    deleteUser: async(req: Request, res: Response) => {
        const { id } = req.body;
        await usersServices.deleteUserService(id);
        res.status(200).json({
            message: "Usuario borrado correctamente"
        })
    },
}