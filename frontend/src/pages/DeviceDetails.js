import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import logo from '../assets/logo192.png';
import '../styles/Devices.css';

const DeviceDetails = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const deviceo = {
    photo_url: logo,
    manufacturer: 'Apple',
    model: 'iPhone 12',
    serial_number: '1234567890',
    os_type: 'iOS',
    os_version: '15.0',
    cpu: 'A14 Bionic',
    ram: '4GB',
    storage: '128GB',
    status: 'Active'
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []); 

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="container">
      <img src={deviceo.photo_url} alt={`${deviceo.manufacturer} ${deviceo.model}`} className="image" />
      <div className="details-container">
        <div className="details">
          <h2 className="title">{deviceo.manufacturer} {deviceo.model}</h2>
          <p className="detail">Serial Number: {deviceo.serial_number}</p>
          <p className="detail">OS: {deviceo.os_type} {deviceo.os_version}</p>
          <p className="detail">CPU: {deviceo.cpu}</p>
          <p className="detail">RAM: {deviceo.ram}</p>
          <p className="detail">Storage: {deviceo.storage}</p>
          <p className="detail">Status: <span className="device-status active">Active</span></p>
        </div>
        <div className="buttonContainer">
          <button className={"button updateButton"} onClick={() => navigate('/devices/update-device')}>
            Update
          </button>
          <button className={"button deleteButton"} onClick={() => console.log('delete')}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;