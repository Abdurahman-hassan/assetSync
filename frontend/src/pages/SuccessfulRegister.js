import { useNavigate } from 'react-router-dom';
import success from "../assets/Success.gif";
import '../styles/activate.css';

const SuccessfulRegister = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return ( 
        <div className="activation-container">
            <div className="check">
                <h2>Congratulations!</h2>
                <img src={success} alt="success" />
            </div>
            <div className="message">
                <p>Your account has been activated successfully</p>
                <button onClick={handleLoginClick} className="login-button">Go to Login</button>
            </div>
        </div>
     );
}

export default SuccessfulRegister;