import success from "../assets/Success.gif"
import '../styles/activate.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const SuccessfulRegister = () => {

    const navigate = useNavigate();


    useEffect(() => {
        const timer = setTimeout(() => {
          navigate('/login');
        }, 2000);
    
        return () => clearTimeout(timer);
      }, [navigate]);

    return ( 
        <div className="activation-container">
            <div className="check">
                <h2>Congratulations !!</h2>
                <img src={success} alt="success" />
            </div>
                
            <div className="message">
                {/* <h2>Congratulations !!</h2> */}
                <p>Your account has been activated successfully</p>
            </div>
        </div>
     );
}
 
export default SuccessfulRegister;