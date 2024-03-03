import { Request, Response } from "express";
import usersServices from "../services/Users.Services";
import IUser from "../interfaces/IUser";
import catchAsync from "../utils/catchAsync";
import { User } from "../entities/User";


//  que el import de las interfaces para req y res sean de EXPRESS Y NO DE OTRA DEPENDENCIA
const getUsers = async (req: Request, res: Response) => {
    const users: User[] = await usersServices.getUsersService();
    res.status(200).json(users);
};

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await usersServices.getUserByIdService(parseInt(id))
    res.status(200).json(user);
};

const createUser = async (req: Request, res: Response) => {
    const { ...data} = req.body;
    // agrego a la variable el tipo interface : IUser, y envio como object las propiedades destructuradas
    const newUser: string = await usersServices.createUserService({ ... data });
    res.status(201).json({
        message: `Usuario ${newUser} creado exitosamente.`
    });

};
const loginUser = async (req: Request, res: Response) => {

    try {
        const authHeader = req.headers.authorization;
        // campos desactivados == undefined
        if (!authHeader) {
            throw new Error('Credenciales no proporcionadas.');
        }
        // campos vacios || datos de acceso
        await usersServices.loginUserService(authHeader);            
        res.status(200).json({
            message: `Login correcto, bienvenido`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            mesage: 'EL usuario no existe o los datos ingresados son invalidos'
        });
    }
};

const putUser = async() => {
    
};
const deleteUser = async(req: Request, res: Response) => {
    const { id } = req.body;
    await usersServices.deleteUserService(id);
    res.status(200).json({
        message: "Usuario borrado correctamente"
    })
};

export default {
    getUsers: catchAsync(getUsers),
    getUserById: catchAsync(getUserById),
    createUser: catchAsync(createUser),
    loginUser,
    putUser: catchAsync(putUser),
    deleteUser: catchAsync(deleteUser),
};