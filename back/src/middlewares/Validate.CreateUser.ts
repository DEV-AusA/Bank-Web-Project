import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

// fx que valida formato fecha
const isValidDateFormat = (dateString: string): boolean => {
    // Expresión regular para validar el formato dd-mm-yyyy
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    return regex.test(dateString);
};

const validateCreateUser = async(req: Request, res: Response, next: NextFunction) => {
    const { name, email, birthdate, nDni } = req.body;

    // name
    if (!name || typeof name !== "string") {
        throw({
            message: "Validando Nombre: Falta algun dato o el dato ingresado es incorrecto",
            code: 400,
            status: "Invalid Name"
        })
    }
    // email
    if (!email || typeof email !== "string") {
        throw({
            message: "Validando Email: Falta algun dato o el dato ingresado es incorrecto",
            code: 400,
            status: "Invalid Email"
        })
    }
    else {
        // Regex en Back tbm :)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw ({
                message: "Validando Email: El formato del correo electrónico es incorrecto",
                code: 400,
                status: "Invalid Email Format"
            });
        }
    }
    // birthdate
    if (!birthdate || typeof birthdate !== "string") {
        throw ({
            message: "Validando Fecha de Nacimiento: La fecha ingresa es incorrecta",
            code: 400,
            status: "Invalid Birthdate"
        });
    }
    else {
        if (!isValidDateFormat(birthdate)) {
            throw ({
                message: "Validando Fecha de Nacimiento: La fecha ingresada tiene un formato inválido (dd-mm-yyyy)",
                code: 400,
                status: "Invalid Format Birthdate"
            });
        }
    }// nDni
    if (!nDni || typeof nDni !== "number") {
        throw ({
            message: "Validando DNI: El DNI ingresado es incorrecto",
            code: 400,
            status: "Invalid DNI"
        });
    }
    else {
        const nDniString = nDni.toString();
        if (nDniString.length !== 8) {
            throw ({
                message: `El DNI ${nDni} no tiene la longitud esperada de 8 dígitos.`,
                code: 400,
                status: "Invalid DNI"
            });
        }
    }

    next();
}
export default {
    validateCreateUser: catchAsync(validateCreateUser)
};