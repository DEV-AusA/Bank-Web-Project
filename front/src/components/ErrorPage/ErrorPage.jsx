import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const ErrorPage = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
        
        setTimeout(() => {
            clearInterval(countdownInterval);
            navigate("/");
        }, 5000);
        return () => clearInterval(countdownInterval);
    }, [navigate]);

    return (
        <div>
            <h1>Page not Found</h1>
            <p>Redirecting to home in {countdown} seconds....</p>
        </div>
    )
}
export default ErrorPage