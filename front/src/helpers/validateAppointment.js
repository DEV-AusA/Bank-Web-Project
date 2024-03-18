const validateAppointment = (input) => {
    const { date, time } = input;
    const errors = {};

    // Validación para el campo "date"
    if (!date) {
        errors.date = 'La fecha del turno es requerida';
    }
    else {
        const selectedDate = new Date(date);
        const currentDate = new Date();
    
        // Verifica si la fecha seleccionada es anterior a la fecha y hora actual
        if (selectedDate < currentDate) {
            errors.date = 'La fecha debe ser posterior a la fecha actual';
        }
        // Verifica si la fecha seleccionada es un día de lunes a viernes (días 1 a 5)
        if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
            errors.date = 'La fecha debe ser un día hábil';
        }
    }
    
    // Validación para el campo "time"
    if (!time) {
        errors.time = 'La hora es requerida';
    } else {
        if (isNaN(time)) {
            errors.time = 'El horario debe ser un número';
        }
        if (time < 1000 || time > 1500) {
            errors.time = 'Debe ser entre las 10hs y las 15hs';
        }
    }


    return errors;
}
export default validateAppointment