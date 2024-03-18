import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

const ValidateGetUserById = async (req:Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    //todo lo que llega de params es string?
    if (!id || typeof id !== "string") {
        throw({
            message: "Validando ID de User: Falta algun dato o el dato ingresado es incorrecto",
            code: 400,
            status: "Invalid User ID"
        })
    }
    next();
}
export default {
    ValidateGetUserById: catchAsync(ValidateGetUserById)
};