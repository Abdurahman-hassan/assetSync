import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAssetRequest } from '../services/api';
import '../styles/RequestDevice.css';

const RequestDevice = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    request_type: 'new_device',
    device: '',
    description: ''
  });

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
      navigate('/my-requests');
    } catch (error) {
      console.error('Failed to create asset request:', error);
      // Handle error (e.g., show error message to user)
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
          <label htmlFor="device">Device ID (optional)</label>
          <input
            type="text"
            id="device"
            name="device"
            value={formData.device}
            onChange={handleInputChange}
          />
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
    </div>
  );
};

export default RequestDevice;