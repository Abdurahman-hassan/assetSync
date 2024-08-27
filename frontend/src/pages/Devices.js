import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import logo from '../assets/logo192.png';
import '../styles/Devices.css';
import { getAllDevices } from '../services/api';

const Devices = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [devices, setDevices] = useState([]);
  const [isSuperuser, setIsSuperuser] = useState(false);

  useEffect(() => {
    const superuserStatus = localStorage.getItem('isSuperuser') === 'true';
    setIsSuperuser(superuserStatus);

    const fetchDevices = async () => {
      try {
        const response = await getAllDevices();
        setDevices(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching devices:', error);
        setIsLoading(false);
      }
    }; 
    fetchDevices();
  }, []);

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="devices page">
        <div className="page-header">
          <h1>Devices</h1>
        </div>
        <div className="devices-items page-items">
          {devices.map((device) => (
            <div
              key={device.id}
              className="device-item page-item"
              onClick={() => navigate(`/devices/${device.id}`)} 
            >
              <div className="device-image">
                <img src={device.photo_url || logo} alt={device.model} />
              </div>
              <div className="device-data">
                <p><strong>Serial Number:</strong> {device.serial_number}</p>
                <p><strong>Manufacturer:</strong> {device.manufacturer}</p>
                <p><strong>Model:</strong> {device.model}</p>
                <p><strong>Status:</strong>
                  <span className={`device-status ${device.status.toLowerCase()}`}>{device.status}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {isSuperuser && (
          <button
            className="button add-device-button"
            onClick={() => navigate('/device')}
          >
            Add Device
          </button>
        )}
      </div>
    );
}

export default Devices;
