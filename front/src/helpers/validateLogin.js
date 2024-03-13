const validateLogin = (input) => {
    const { username, password } = input;
    const errors = {}
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // <= regex 

    // Validación para el campo "email"
    if(!username) errors.username = 'El Username es requerido';
    // else {
    //     if(!emailRegex.test(email)) errors.email = "Debe ingresar un Email válido";
    // }

    // Validación para el campo "password"
    errors.password = password.trim() === '' ? 'La contraseña es requerida' : '';

    return errors;
}
export default validateLogin