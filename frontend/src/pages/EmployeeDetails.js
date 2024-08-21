import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Profile.css';

const EmployeeDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState({
    username: '',
    email: '',
    full_name: '',
    team: '',
    role: ''
  });
  const [editedEmployee, setEditedEmployee] = useState({});

  useEffect(() => {
    // Simulating API call to fetch employee data
    setTimeout(() => {
      setEmployee({
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
    setEditedEmployee({...employee});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedEmployee({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee(prev => ({...prev, [name]: value}));
  };

  const handleUpdate = () => {
    // Send the updated employee data to API
    // For now, we'll just update the local state and refresh the page
    setEmployee(editedEmployee);
    setIsEditing(false);
    window.location.reload();
  };

  const handleDelete = () => {
    // Send a delete request to API
    // For now, we'll just log a message
    console.log('Delete employee');
    // might want to navigate to a different page after deletion
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Employee Details</h1>
      <div className="profile-card">
        {Object.entries(employee).map(([key, value]) => (
          <div className="profile-field" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}:</label>
            {isEditing ? (
              <input
                type="text"
                name={key}
                value={editedEmployee[key] || value}
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
            <>
              <button onClick={handleEdit} className="button editButton">Edit</button>
              <button onClick={handleDelete} className="button deleteButton">Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
