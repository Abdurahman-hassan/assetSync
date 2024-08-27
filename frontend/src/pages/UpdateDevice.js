import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { updateDevice } from '../services/api'; 
import api from '../services/api';
import '../styles/Devices.css';

const UpdateDevice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState({
    manufacturer: '',
    model: '',
    serial_number: '',
    os_type: '',
    os_version: '',
    cpu: '',
    ram: '',
    storage: '',
    status: ''
  });

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const response = await api.get(`devices/${id}`);
        setDevice(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching device details:', error);
        setIsLoading(false);
      }
    };
    
    fetchDeviceDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDevice(prevDevice => ({
      ...prevDevice,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDevice(id, device);
      console.log('Updated device:', device);
      navigate('/devices/device-details');
    } catch (error) {
      console.error('Error updating device:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="update-device">
      <div className="page-header">
        <h1>Update Device</h1>
      </div>
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label htmlFor="manufacturer">Manufacturer</label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={device.manufacturer}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={device.model}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="serial_number">Serial Number</label>
          <input
            type="text"
            id="serial_number"
            name="serial_number"
            value={device.serial_number}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="os_type">OS Type</label>
          <input
            type="text"
            id="os_type"
            name="os_type"
            value={device.os_type}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="os_version">OS Version</label>
          <input
            type="text"
            id="os_version"
            name="os_version"
            value={device.os_version}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpu">CPU</label>
          <input
            type="text"
            id="cpu"
            name="cpu"
            value={device.cpu}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ram">RAM</label>
          <input
            type="text"
            id="ram"
            name="ram"
            value={device.ram}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="storage">Storage</label>
          <input
            type="text"
            id="storage"
            name="storage"
            value={device.storage}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <div className="radio-input">
            <label>
              <input
                type="radio"
                name="status"
                value="Active"
                checked={device.status === "Active"}
                onChange={handleInputChange}
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={device.status === "Inactive"}
                onChange={handleInputChange}
              />
              Inactive
            </label>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="button updateButton">Update Device</button>
          <button type="button" className="button cancelButton" onClick={() => navigate('/devices/device-details')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDevice;
