import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendActivationCode, verifyActivationCode } from "../services/api";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";
import email from "../assets/email.svg";
import '../styles/activate.css';

const SuccessfulActivate = () => {
    const navigate = useNavigate();
    const [activationCode, setActivationCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Clear success message after 3 seconds
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleResendCode = async () => {
        setLoading(true);
        try {
            await sendActivationCode();
            setMessage("Activation code sent to your email.");
        } catch (error) {
            setError("Failed to send activation code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await verifyActivationCode(activationCode);
            navigate('/success-register');
        } catch (error) {
            setError("Invalid activation code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <div className="activation-container">
            <div className="icon">
                <h2>Activate account</h2>
                <img src={email} alt="email" />
            </div>
                
            <div className="message">
                <p>Please check your email to activate your account.</p>

                <form onSubmit={handleSubmit}>
                    <input
                        className="activation-input"
                        type="text"
                        value={activationCode}
                        onChange={(e) => setActivationCode(e.target.value)}
                        placeholder="Enter activation code"
                        required
                    />
                    <button type="submit" className="activate" disabled={loading}>
                        {loading ? <LoadingSpinner color="#ffffff" size={20} /> : "Activate account"}
                    </button>
                </form>

                <div className="re-send">
                    <p>Didn't receive an email?</p>
                    <button onClick={handleResendCode} className="activate" disabled={loading}>
                        {loading ? <LoadingSpinner color="#ffffff" size={20} /> : "Send activation code"}
                    </button>
                </div>

                {message && <Message type="success">{message}</Message>}
                {error && <Message type="error">{error}</Message>}
            </div>
        </div>
     );
}
 
export default SuccessfulActivate;
