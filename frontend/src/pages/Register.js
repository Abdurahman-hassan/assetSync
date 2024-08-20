import { useState } from "react";
import backgroundLogo from "../assets/backgroundLogo.svg";
import "../styles/account.css"


const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        department: '',
    });
    const [errors, setErrors] = useState({});
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
        if (!formData.department) validateError.department = 'Select a department';
        if (formData.department === "Select") validateError.department = 'Select a department';

        setErrors(validateError);
        return Object.keys(validateError).length === 0;
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSelect = (value) => {
        setFormData({ ...formData, department: value });
        setDropdownOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) {
            console.log('Form submitted successfully:', formData);
            setErrors({});
        }
    };

    return ( 
        <div className="register-container">
            <div className="soligan">
                <img src={backgroundLogo} alt="logo" className="logo" />
                <p>Blah blah blah <br />web web web web web web web <br />web web web web web web web</p>
            </div>
            <div className="signup">
                <h2>Sign up</h2>
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
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <label>Confirm password:</label>
                    <input
                        className={`input ${errors.confirmPassword ? 'error-input' : ''}`}
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    <label>Department:</label>
                    <div className={`custom-dropdown ${errors.department ? 'error-input' : ''}`}>
                    <div className="selected" onClick={toggleDropdown}>
                        {formData.department ? formData.department : "Select"}
                    </div>
                    {dropdownOpen && (
                        <ul className="dropdown-list">
                            <li onClick={() => handleSelect("IT")}>IT</li>
                            <li onClick={() => handleSelect("HR")}>HR</li>
                            <li onClick={() => handleSelect("Finance")}>Finance</li>
                            <li onClick={() => handleSelect("Marketing")}>Marketing</li>
                        </ul>
                    )}
                </div>
                {errors.department && <p className="error">{errors.department}</p>}
                    <button className="submit">Sign up</button>
                    <p>Already have an account? <a href="/Login">Login</a> </p>
                </form>
            </div>
        </div>
     );
}
 
export default Register;