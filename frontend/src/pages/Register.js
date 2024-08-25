import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundLogo from "../assets/backgroundLogo.svg";
import "../styles/account.css";
import { register, login } from "../services/api";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";

const DEPARTMENT_CHOICES = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'HR' },
    { value: 'business', label: 'Business' },
];

const TEAM_CHOICES = {
    engineering: [
        { value: 'frontend', label: 'Frontend Team' },
        { value: 'backend', label: 'Backend Team' },
        { value: 'full_stack', label: 'Full Stack Team' },
        { value: 'devops', label: 'DevOps Team' },
        { value: 'data_science', label: 'Data Science Team' },
        { value: 'qa', label: 'QA Team' },
        { value: 'security', label: 'Security Team' },
        { value: 'cloud', label: 'Cloud Team' },
        { value: 'mobile', label: 'Mobile Development Team' },
        { value: 'ui_ux', label: 'UI/UX Design Team' },
        { value: 'solutions_architecture', label: 'Solutions Architecture Team' },
        { value: 'sre', label: 'Site Reliability Engineering (SRE) Team' },
        { value: 'it', label: 'IT Team' },
    ],
    sales: [
        { value: 'sales', label: 'Sales Team' },
        { value: 'customer_support', label: 'Customer Support Team' },
    ],
    hr: [
        { value: 'hr', label: 'HR Team' },
        { value: 'it_support', label: 'IT Support Team' },
    ],
    business: [
        { value: 'business_analysis', label: 'Business Analysis Team' },
        { value: 'marketing', label: 'Marketing Team' },
        { value: 'product_management', label: 'Product Management Team' },
        { value: 'project_management', label: 'Project Management Team' },
    ],
};

const ROLE_TEAM_MAP = {
    frontend: ['frontend_developer', 'tech_lead'],
    backend: ['backend_developer', 'tech_lead'],
    full_stack: ['full_stack_developer'],
    devops: ['devops_engineer'],
    data_science: ['data_scientist'],
    qa: ['qa_engineer'],
    security: ['security_engineer'],
    cloud: ['cloud_engineer'],
    mobile: ['mobile_dev_ios', 'mobile_dev_android'],
    ui_ux: ['ui_ux_designer'],
    solutions_architecture: ['solution_architect'],
    sre: ['sre'],
    sales: ['sales_manager'],
    customer_support: ['customer_support_manager', 'technical_support_engineer'],
    hr: ['hr_manager'],
    business_analysis: ['business_analyst'],
    marketing: ['marketing_manager'],
    product_management: ['product_manager'],
    project_management: ['project_manager', 'scrum_master'],
    it: ['it_manager', 'systems_administrator'],
};

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        department: '',
        team: '',
        role: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'department' ? { team: '', role: '' } : {}),
            ...(name === 'team' ? { role: '' } : {})
        }));
    };

    const validate = () => {
        const validateError = {};  
       
        if (!formData.name) validateError.name = "Name is required";
        if (!formData.username) validateError.username = "Username is required";
        if (!formData.email.includes('@')) validateError.email = "This email is invalid";
        if (formData.password.length < 6) validateError.password = 'Password must be at least 6 characters long';
        if (formData.password !== formData.password2) validateError.password2 = 'Passwords do not match';
        if (!formData.department) validateError.department = "Department is required";
        if (!formData.team) validateError.team = "Team is required";
        if (!formData.role) validateError.role = "Role is required";

        setErrors(validateError);
        return Object.keys(validateError).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            setErrors({});
            setMessage("");

            try {
                await register(
                    formData.name,
                    formData.username,
                    formData.email,
                    formData.password,
                    formData.password2,
                    formData.department,
                    formData.team,
                    formData.role
                );
                
                await login(formData.email, formData.password);
                
                setMessage('Registration successful');
                navigate('/activate');
            } catch (error) {
                console.error('Registration failed:', error);
                setErrors({ general: error.response?.data?.detail || 'Registration failed. Please try again.' });
            } finally {
                setLoading(false);
            }
        }
    };

    const getTeamsForDepartment = () => TEAM_CHOICES[formData.department] || [];
    const getRolesForTeam = () => (ROLE_TEAM_MAP[formData.team] || []).map(role => ({
        value: role,
        label: role.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    }));
    
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

                    <label>Department:</label>
                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className={`input ${errors.department ? 'error-input' : ''}`}
                    >
                        <option value="">Select Department</option>
                        {DEPARTMENT_CHOICES.map((dep) => (
                            <option key={dep.value} value={dep.value}>
                                {dep.label}
                            </option>
                        ))}
                    </select>
                    {errors.department && <p className="error">{errors.department}</p>}

                    <label>Team:</label>
                    <select
                        name="team"
                        value={formData.team}
                        onChange={handleChange}
                        className={`input ${errors.team ? 'error-input' : ''}`}
                        disabled={!formData.department}
                    >
                        <option value="">Select Team</option>
                        {getTeamsForDepartment().map((team) => (
                            <option key={team.value} value={team.value}>
                                {team.label}
                            </option>
                        ))}
                    </select>
                    {errors.team && <p className="error">{errors.team}</p>}

                    <label>Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={`input ${errors.role ? 'error-input' : ''}`}
                        disabled={!formData.team}
                    >
                        <option value="">Select Role</option>
                        {getRolesForTeam().map((role) => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                        ))}
                    </select>
                    {errors.role && <p className="error">{errors.role}</p>}

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
};

export default Register;
