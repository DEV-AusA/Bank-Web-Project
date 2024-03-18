import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

const validateLogin = async(req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || typeof username !== "string") {
        throw({
            message: "Validando Username: Falta algun dato o el dato ingresado es incorrecto",
            code: 400,
            status: "Invalid Username"
        });
    }
    else {
        if (!password || typeof password !== "string") {
            throw({
                message: "Validando Password: Falta algun dato o el dato ingresado es incorrecto",
                code: 400,
                status: "Invalid Password"
            });
        }
    }
    next();
}
export default {
    validateLogin: catchAsync(validateLogin)
};