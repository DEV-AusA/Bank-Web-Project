import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

const ValidateAddAppointment = async(req: Request, res: Response, next: NextFunction) => {
    const { date, time } = req.body;

    if (!date || typeof date !== "string") {
        throw({
            message: "Validando Fecha: Falta la fecha o la fecha ingresada es incorrecta",
            code: 400,
            status: "Invalid Date"
        });
    }
    else {
        if (!time || typeof time !== "string") {
            throw({
                message: "Validando Hora: Falta la hora o la hora ingresada es incorrecta",
                code: 400,
                status: "Invalid Time"
            });
        }
    }
    next();
}
export default {
    ValidateAddAppointment: catchAsync(ValidateAddAppointment)
};