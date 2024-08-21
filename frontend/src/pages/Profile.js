import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Profile.css';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    full_name: '',
    team: '',
    role: ''
  });
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    // Simulating API call to fetch profile data
    setTimeout(() => {
      setProfile({
        username: 'johndoe',
        email: 'john.doe@example.com',
        full_name: 'John Doe',
        team: 'Development',
        role: 'Software Engineer'
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({...profile});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({...prev, [name]: value}));
  };

  const handleUpdate = () => {
    // Send the updated profile data to API
    // For now, we'll just update the local state and refresh the page
    setProfile(editedProfile);
    setIsEditing(false);
    window.location.reload();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-card">
        {Object.entries(profile).map(([key, value]) => (
          <div className="profile-field" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}</label>
            {isEditing ? (
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
              <button onClick={handleCancel} className="button cancelButton">Cancel</button>
              <button onClick={handleUpdate} className="button updateButton">Update</button>
            </>
          ) : (
            <button onClick={handleEdit} className="button editButton">Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
