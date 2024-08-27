/**
 * TODO: Implement login page
 */

import { useState } from "react";
import { login, createLoginSession } from "../services/api";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";
import backgroundLogo from "../assets/backgroundLogo.svg";
import "../styles/account.css"

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors("");
        setMessage("");

        const startTime = Date.now();

        try {
            await login(formData.email, formData.password);
            const userData = await createLoginSession(formData.email, formData.password);
            console.log('Login successful:', userData);
            // Ensure loading spinner shows for at least 1 second
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 2000) {
                await new Promise(resolve => setTimeout(resolve, 2000 - elapsedTime));
            }

            setMessage("Login successful");
            setLoading(false);

            // Wait for 1.5 seconds before navigating
            setTimeout(() => {
                navigate('/requests');
            }, 1500);
        } catch (error) {
            console.error('Login failed:', error);
            setErrors(error.response?.data?.detail || "An error occurred during login");

            // Ensure loading spinner shows for at least 1 second
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 2000) {
                await new Promise(resolve => setTimeout(resolve, 2000 - elapsedTime));
            }
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return ( 
        <div className="register-container">
            <div className="soligan">
                <img src={backgroundLogo} alt="logo" className="logo" />
                <p>AssetSync <br />Your Asset Management Solution<br />and more..</p>
            </div>
            <div className="signin">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input
                        className={`input ${errors.email ? 'error-input' : ''}`}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                    />
                    
                    <label>Password:</label>
                    <input
                        className={`input ${errors.password ? 'error-input' : ''}`}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button
                        type="button"
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                    >
                    {showPassword ? "Hide" : "Show"} Password
                    </button>

                    {errors && <Message type="error">{errors}</Message>}

                    <button className="submit" disabled={loading}>
                        {loading ? <LoadingSpinner color="#222831" size={20} /> : "Login"}
                    </button>

                    {message && <Message type="success">{message}</Message>}

                    <p>Don't have an account? <a href="/register">Sign up</a> </p>
                </form>
            </div>
        </div>
    );
}

export default Login;