import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import { addDevice } from '../services/api';
import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';

const AddDevicePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        hostname: '',
        serial_number: '',
        manufacturer: '',
        model: '',
        os_type: '',
        os_version: '',
        cpu: '',
        cpu_cores: '',
        cpu_threads: '',
        ram_total_gb: '',
        disk_total_gb: '',
        photo_url: '',
        status: 'available'
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');
        try {
        const response = await addDevice(formData);
        console.log('Device added successfully:', response.data);
        setMessage('Device added successfully!');
        setTimeout(() => {
            navigate('/devices');
        }, 2000);
        } catch (error) {
        setError('Failed to add device: ' + error.message);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="profile-container">
        <h1 className="profile-title">Add Device</h1>
        <div className="profile-card">
            <form onSubmit={handleSubmit}>
            <div className="profile-field">
                <label>Hostname:</label>
                <input
                type="text"
                name="hostname"
                value={formData.hostname}
                onChange={handleChange}
                className="profile-field-input"
                />
            </div>
            <div className="profile-field">
                <label>Serial Number:</label>
                <input
                type="text"
                name="serial_number"
                value={formData.serial_number}
                onChange={handleChange}
                className="profile-field-input"
                />
            </div>
            <div className="profile-field">
                <label>Manufacturer:</label>
                <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                className="profile-field-input"
                />
            </div>
            <div className="profile-field">
                <label>Model:</label>
                <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="profile-field-input"
                />
            </div>
            <div className="profile-field">
                <label>OS Type:</label>
                <input
                type="text"
                name="os_type"
                value={formData.os_type}
                onChange={handleChange}
                className="profile-field-input"
                />
            </div>
            <div className="profile-field">
                <label>OS Version:</label>
                <input
                type="text"
                name="os_version"
                value={formData.os_version}
                onChange={handleChange}
                className="profile-field-input"
                />
            </div>
            <div className="profile-field">
                <label>CPU:</label>
                <input
                type="text"
                name="cpu"
                value={formData.cpu}
                onChange={handleChange}
                className="profile-field-input"
                />
            </div>
            <div className="profile-field">
                <label>CPU Cores:</label>
                <input
                type="number"
                name="cpu_cores"
                value={formData.cpu_cores}
                onChange={handleChange}
                className="profile-field-input"
                />
            </div>
            <div className="profile-field">
                <label>CPU Threads:</label>
                <input
                type="number"
                name="cpu_threads"
                value={formData.cpu_threads}
                onChange={handleChange}
                className="profile-field-input"
                />
            </div>
            <div className="profile-field">
                <label>RAM Total (GB):</label>
                <input
                type="number"
                name="ram_total_gb"
                value={formData.ram_total_gb}
                onChange={handleChange}
                className="profile-field-input"
                />
            </div>
            <div className="profile-field">
                <label>Disk Total (GB):</label>
                <input
                type="number"
                name="disk_total_gb"
                value={formData.disk_total_gb}
                onChange={handleChange}
                className="profile-field-input"
                />
            </div>
            <div className="profile-field">
                <label>Photo URL:</label>
                <input
                type="text"
                name="photo_url"
                value={formData.photo_url}
                onChange={handleChange}
                className="profile-field-input"
                />
            </div>
            <div className="profile-field">
                <label>Status:</label>
                <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="profile-field-input"
                >
                <option value="available">Available</option>
                <option value="assigned">Assigned</option>
                <option value="repair">In Repair</option>
                </select>
            </div>
            {message && <Message type="success">{message}</Message>}
            {error && <Message type="error">{error}</Message>}
            <div className="button-group">
                <button type="submit" className="button updateButton" disabled={isLoading}>
                    {isLoading ? <LoadingSpinner color="#ffffff" size={20} /> : "Add Device"}
                </button>
                <button
              type="button"
              className="button cancelButton"
              onClick={() => navigate('/devices')}
              disabled={isLoading}
            >
              Cancel
            </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default AddDevicePage;
