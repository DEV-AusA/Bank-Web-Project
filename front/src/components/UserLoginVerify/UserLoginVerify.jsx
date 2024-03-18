import { useState } from "react"
import { useDispatch } from "react-redux";
import { UserLogin } from "../../Redux/userSlice";


const UserLoginVerify = () => {

    const [ user, setUser ] = useState({
        username: "",
        password: ""
    });
    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    };

    //* guardo los dispatch dentro de reducers
    const dispatch = useDispatch();

    const handleOnSubmit = (event) => {
        event.preventDefault();

        //* de aca se envia la ACTION (type: UserLogin, payload:) payload => datos de login
        dispatch(UserLogin(user));
        setUser({
            username: "",
            password: ""
        })
    }

    return (        
        <div>
            <h2>Login</h2>
            <form action="" onSubmit={handleOnSubmit}>
                <label htmlFor="nombre"> Username: </label>
                <input type="text" id="username" name="username" value={user.username} onChange={handleChange} />
                <br />
                <label htmlFor="apellido"> Password: </label>
                <input type="password" id="password" name="password" value={user.password} onChange={handleChange}/>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default UserLoginVerify
