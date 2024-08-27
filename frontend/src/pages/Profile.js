import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, sendResetPasswordCode } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    email: '',
    department: '',
    team: '',
    role: ''
  });
  const [editedProfile, setEditedProfile] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setProfile({
        name: response.data.name,
        username: response.data.username,
        email: response.data.email.value,
        department: response.data.department,
        team: response.data.team,
        role: response.data.role
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({
      name: profile.name,
      username: profile.username,
      email: profile.email
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({...prev, [name]: value}));
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    setError('');
    const startTime = Date.now();
  
    try {
      await updateUserProfile(editedProfile);
      setProfile(prev => ({...prev, ...editedProfile}));
      setIsEditing(false);
      setMessage('Profile updated successfully');
  
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 3000 - elapsedTime);
  
      setTimeout(() => {
        setIsUpdating(false);
        setMessage('');
        navigate('/profile');
      }, remainingTime);
  
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError('Failed to update profile. Please try again.');
      setTimeout(() => {
        setIsUpdating(false);
      }, 3000);
    }
  };

  const handleResetPassword = async () => {
    setIsUpdating(true);
    setError('');
    try {
      await sendResetPasswordCode(profile.email);
      navigate('/profile/reset-password', { state: { email: profile.email } });
    } catch (error) {
      console.error('Failed to send reset password code:', error);
      setError('Failed to send reset password code. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      {message && <Message type="success">{message}</Message>}
      {error && <Message type="error">{error}</Message>}
      <div className="profile-card">
        {Object.entries(profile).map(([key, value]) => (
          <div className="profile-field" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            {isEditing && ['name', 'username', 'email'].includes(key) ? (
              <input
                type="text"
                name={key}
                value={editedProfile[key] || value}
                onChange={handleChange}
              />
            ) : (
              <p>{value}</p>
            )}
          </div>
        ))}
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button onClick={handleCancel} className="button cancelButton" disabled={isUpdating}>Cancel</button>
              <button onClick={handleUpdate} className="button updateButton" disabled={isUpdating}>
                {isUpdating ? <LoadingSpinner color="#222831" size={20} /> : "Update"}
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEdit} className="button editButton">Edit</button>
              <button onClick={handleResetPassword} className="button editButton resetPasswordButton">Reset Password</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;