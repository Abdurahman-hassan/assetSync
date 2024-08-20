/**
 * TODO: Implement login page
 */

import { useState } from "react";
import backgroundLogo from "../assets/backgroundLogo.svg";
import "../styles/account.css"

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        department: '',
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validation = () => {
        const validateError = {};

        if (!formData.email.includes('@')) validateError.email = "This email is invalid";
        if (formData.password.length < 6) {
            validateError.password = 'Password must be at least 6 characters long';
        }
        if (formData.password !== formData.confirmPassword) {
            validateError.confirmPassword = 'Passwords do not match';
        }
        setErrors(validateError);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) {
            console.log('Form submitted successfully:', formData);
            setErrors({});
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    return ( 
        <div className="register-container">
            <div className="soligan">
                <img src={backgroundLogo} alt="logo" className="logo" />
                <p>Blah blah blah <br />web web web web web web web <br />web web web web web web web</p>
            </div>
            <div className="signin">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
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
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <button
                        type="button"
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                    >
                    {showPassword ? "Hide" : "Show"} Password
                    </button>
                    <button className="submit">Login</button>
                    <p>Don't have an account? <a href="/">Sign up</a> </p>
                </form>
            </div>
        </div>
     );
}
 
export default Login;