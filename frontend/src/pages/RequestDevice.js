import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createAssetRequest } from '../services/api';
import '../styles/RequestDevice.css';
import Message from '../components/Message';

const RequestDevice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const deviceId = location.state?.deviceId || '';
  const [formData, setFormData] = useState({
    request_type: 'new_device',
    device: deviceId,
    description: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (deviceId) {
      setFormData(prevData => ({
        ...prevData,
        device: deviceId,
        request_type: 'new_device'
      }));
    }
  }, [deviceId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAssetRequest(formData);
      setMessage('Request submitted successfully!');
      setTimeout(() => {
        navigate('/my-requests');
      }, 2000);
    } catch (error) {
      console.error('Failed to create asset request:', error);
      setError(error.response.data.error || 'Failed to submit request. Please try again.');
    }
  };

  return (
    <div className="request-device-container">
      <h1>Request a Device</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="request_type">Request Type</label>
          <select
            id="request_type"
            name="request_type"
            value={formData.request_type}
            onChange={handleInputChange}
            required
          >
            <option value="new_device">New Device</option>
            <option value="repair">Repair</option>
            <option value="upgrade">Upgrade</option>
            <option value="leave_company">Leave Company</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Submit Request</button>
      </form>
      {message && <Message type="success">{message}</Message>}
      {error && <Message type="error">{error}</Message>}
    </div>
  );
};

export default RequestDevice;