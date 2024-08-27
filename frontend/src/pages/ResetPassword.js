import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyResetPasswordCode, resetPassword, logout } from '../services/api';
import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';
import success from "../assets/email.svg";
import '../styles/ResetPassword.css';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const email = location.state?.email;

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await verifyResetPasswordCode(email, code);
      setKey(response.data.key);
      setTimeout(() => {
        setStep(2);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setError('Invalid code. Please try again.');
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await resetPassword(key, email, password, password2);
      setMessage('Password reset successfully');
      setTimeout(async () => {
        await logout();
        navigate('/login');
      }, 3000);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="reset-password-container">
        <div className="icon">
          <h2>Reset Password</h2>
          <img src={success} alt="Email Sent" />
        </div>
        <div className="message">
          <p>A reset code has been sent to your email.</p>
          <form onSubmit={handleVerifyCode}>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter reset code"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? <LoadingSpinner color="#222831" size={20} /> : "Verify Code"}
            </button>
          </form>
          {error && <Message type="error">{error}</Message>}
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <h2>Set New Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          required
        />
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm new password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner color="#222831" size={20} /> : "Reset Password"}
        </button>
      </form>
      {error && <Message type="error">{error}</Message>}
      {message && <Message type="success">{message}</Message>}
    </div>
  );
};

export default ResetPassword;
