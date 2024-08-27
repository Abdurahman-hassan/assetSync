import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import { updateDevice, getDeviceById } from '../services/api';
import '../styles/Devices.css';

const UpdateDevice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState({
    hostname: '',
    manufacturer: '',
    model: '',
    serial_number: '',
    os_type: '',
    os_version: '',
    cpu: '',
    cpu_cores: '',
    cpu_threads: '',
    ram_total_gb: '',
    disk_total_gb: '',
    status: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const response = await getDeviceById(id);
        setDevice(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching device details:', error);
        setError('Failed to fetch device details. Please try again.');
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
    setIsUpdating(true);
    setError('');
    setMessage('');
    try {
      await updateDevice(id, device);
      setMessage('Device updated successfully!');
      setTimeout(() => {
        navigate(`/devices/${id}`);
      }, 2000);
    } catch (error) {
      console.error('Error updating device:', error);
      setError('Failed to update device. Please try again.');
    } finally {
      setIsUpdating(false);
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
          <label htmlFor="ram_total_gb">RAM</label>
          <input
            type="text"
            id="ram_total_gb"
            name="ram_total_gb"
            value={device.ram_total_gb}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="disk_total_gb">Storage</label>
          <input
            type="text"
            id="disk_total_gb"
            name="disk_total_gb"
            value={device.disk_total_gb}
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
                value="assigned"
                checked={device.status === "assigned"}
                onChange={handleInputChange}
              />
              Assigned
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="repair"
                checked={device.status === "repair"}
                onChange={handleInputChange}
              />
              Repair
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="available"
                checked={device.status === "available"}
                onChange={handleInputChange}
              />
              Available
            </label>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="button updateButton" disabled={isUpdating}>
            {isUpdating ? <LoadingSpinner color="#ffffff" size={20} /> : "Update Device"}
          </button>
          <button 
            type="button" 
            className="button cancelButton" 
            onClick={() => navigate(`/devices/${id}`)}
            disabled={isUpdating}
          >
            Cancel
          </button>
        </div>
        {message && <Message type="success">{message}</Message>}
        {error && <Message type="error">{error}</Message>}
      </form>
    </div>
  );
};

export default UpdateDevice;
