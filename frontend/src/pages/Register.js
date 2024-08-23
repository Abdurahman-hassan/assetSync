import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundLogo from "../assets/backgroundLogo.svg";
import "../styles/account.css";
import { register, login } from "../services/api";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validation = () => {
        const validateError = {};  
       
        if (!formData.name) validateError.name = "Name is required";
        if (!formData.username) validateError.username = "Username is required";
        if (!formData.email.includes('@')) validateError.email = "This email is invalid";
        if (formData.password.length < 6) {
            validateError.password = 'Password must be at least 6 characters long';
        }
        if (formData.password !== formData.password2) {
            validateError.password2 = 'Passwords do not match';
        }

        setErrors(validateError);
        return Object.keys(validateError).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validation()) {
            setLoading(true);
            setErrors({});
            setMessage("");

            try {
                await register(
                    formData.name,
                    formData.username,
                    formData.email,
                    formData.password,
                    formData.password2
                );
                
                // Login to get access token
                await login(formData.email, formData.password);
                
                setMessage('Registration successful');
                navigate('/activate');
            } catch (error) {
                console.error('Registration failed:', error);
                setErrors({ general: error.response?.data?.detail || error.response?.data?.password || 'Registration failed. Please try again.' });
            } finally {
                setLoading(false);
            }
        }
    };

    return ( 
        <div className="register-container">
            <div className="soligan">
                <img src={backgroundLogo} alt="logo" className="logo" />
                <p>AssetSync<br />Your asset management solution<br />and more..</p>
            </div>
            <div className="signup">
                <h2>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input
                        className={`input ${errors.name ? 'error-input' : ''}`}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="ex. John Doe"
                    />
                    {errors.name && <p className="error">{errors.name}</p>}

                    <label>Username:</label>
                    <input
                        className={`input ${errors.username ? 'error-input' : ''}`}
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="ex. johndoe"
                    />
                    {errors.username && <p className="error">{errors.username}</p>}

                    <label>Email:</label>
                    <input
                        className={`input ${errors.email ? 'error-input' : ''}`}
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    
                    <label>Password:</label>
                    <input
                        className={`input ${errors.password ? 'error-input' : ''}`}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="password"
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <label>Confirm password:</label>
                    <input
                        className={`input ${errors.password2 ? 'error-input' : ''}`}
                        type="password"
                        name="password2"
                        placeholder="confirm password"
                        onChange={handleChange}
                        value={formData.password2}
                    />
                    {errors.password2 && <p className="error">{errors.password2}</p>}

                    {errors.general && <Message type="error">{errors.general}</Message>}
                    {message && <Message type="success">{message}</Message>}

                    <button className="submit" disabled={loading}>
                        {loading ? <LoadingSpinner color="#222831" size={20} /> : "Sign up"}
                    </button>
                    <p>Already have an account? <a href="/Login">Login</a> </p>
                </form>
            </div>
        </div>
     );
}

export default Register;