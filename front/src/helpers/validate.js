const validate = (input) => {
    const { name, email, birthdate, nDni, username, password, confirmpassword } = input;
    const errors = {}
    // regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const numberRegex = /^[0-9]{1,8}$/; // para aceptar solo números y máximo 8 caracteres

    // Validación para el campo "name"
    if (!name) {
        errors.name = 'Se requiere un nombre completo';
    } else {
        if (name.length < 4) errors.name = "Debe contener al menos 5 carácteres";
        else if (name.length > 20) errors.name = "Máximo 15 carácteres";
        else if (!name.trim()) errors.name = "Ingrese un nombre válido";
    }    

    // Validación para el campo "email"
    if(!email) errors.email = 'El mail es requerido';
    else {
        if(!emailRegex.test(email)) errors.email = "Debe ingresar un Email válido";
    }

    // Validación para el campo "birthdate"
    if (!birthdate) {
        errors.birthdate = 'La fecha de nacimiento es requerida';
    } else {
        const birthdateDate = new Date(birthdate);
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 125); // 125 años atrás desde la fecha actual
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 18); // 18 años atrás desde la fecha actual

        if (birthdateDate < minDate || birthdateDate > maxDate) {
            errors.birthdate = 'La fecha de nacimiento es incorrecta';
        }
    }

    // Validación para el campo "nDni"
    if (!nDni) {
        errors.nDni = 'El numero de DNI es requerido';
    }
    if (!numberRegex.test(nDni)) {
        errors.nDni = 'Ingrese máximo 8 numeros.';
    }

    // Validación para el campo "username"
    errors.username = username.trim() === '' ? 'Se requiere un username' : '';

    // Validación para los campos "password"
    errors.password = password.trim() === '' ? 'La contraseña es requerida' : '';
    errors.confirmpassword = confirmpassword.trim() === '' ? 'La contraseña es requerida' : '';
    // verifico si coinciden
    if(password !== confirmpassword)
    errors.confirmpassword = 'Las contraseñas deben ser iguales';

    return errors;
}
export default validate