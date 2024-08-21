import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import logo from '../assets/logo192.png';
import '../styles/Devices.css';

const Devices = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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
    <>
      <div className="devices page">
        <div className="page-header">
          <h1>Devices</h1>
        </div>
        <div className="devices-items page-items">

          <div className="device-item page-item" onClick={() => navigate('/devices/device-details')}>
              <div className="device-image">
                  <img src={logo} alt="Device" />
              </div>
              <div className="device-data">
                <p><strong>Serial Number:</strong> 1234567890</p>
                <p><strong>Manufacturer:</strong> Apple</p>
                <p><strong>Model:</strong> iPhone 12</p>
                <p><strong>Status:</strong><span className="device-status active">Active</span></p>
              </div>
          </div>

          <div className="device-item page-item">
              <div className="device-image">
                  <img src={logo} alt="Device" />
              </div>
              <div className="device-data">
                <p><strong>Serial Number:</strong> 1234567890</p>
                <p><strong>Manufacturer:</strong> Apple</p>
                <p><strong>Model:</strong> iPhone 12</p>
                <p><strong>Status:</strong><span className="device-status">Inactive</span></p>
              </div>
          </div>

          <div className="device-item page-item">
              <div className="device-image">
                  <img src={logo} alt="Device" />
              </div>
              <div className="device-data">
                <p><strong>Serial Number:</strong> serial_number</p>
                <p><strong>Manufacturer:</strong> Apple</p>
                <p><strong>Model:</strong> iPhone 12</p>
                <p><strong>Status:</strong><span className="device-status active">Active</span></p>
              </div>
          </div>

          <div className="device-item page-item">
              <div className="device-image">
                  <img src={logo} alt="Device" />
              </div>
              <div className="device-data">
                <p><strong>Serial Number:</strong> 1234567890</p>
                <p><strong>Manufacturer:</strong> Apple</p>
                <p><strong>Model:</strong> iPhone 12</p>
                <p><strong>Status:</strong><span className="device-status">Inactive</span></p>
              </div>
          </div>

          <div className="device-item page-item">
              <div className="device-image">
                  <img src={logo} alt="Device" />
              </div>
              <div className="device-data">
                <p><strong>Serial Number:</strong> 1234567890</p>
                <p><strong>Manufacturer:</strong> Apple</p>
                <p><strong>Model:</strong> MacBook Pro</p>
                <p><strong>Status:</strong><span className="device-status">Inactive</span></p>
              </div>
          </div>

          <div className="device-item page-item">
              <div className="device-image">
                  <img src={logo} alt="Device" />
              </div>
              <div className="device-data">
                <p><strong>Serial Number:</strong> 1234567890</p>
                <p><strong>Manufacturer:</strong> Apple</p>
                <p><strong>Model:</strong> MacBook Pro</p>
                <p><strong>Status:</strong><span className="device-status">Inactive</span></p>
              </div>
          </div>

          <div className="device-item page-item">
              <div className="device-image">
                  <img src={logo} alt="Device" />
              </div>
              <div className="device-data">
                <p><strong>Serial Number:</strong> 1234567890</p>
                <p><strong>Manufacturer:</strong> HP</p>
                <p><strong>Model:</strong> HP Pavilion</p>
                <p><strong>Status:</strong><span className="device-status">Inactive</span></p>
              </div>
          </div>

          <div className="device-item page-item">
              <div className="device-image">
                  <img src={logo} alt="Device" />
              </div>
              <div className="device-data">
                <p><strong>Serial Number:</strong> 1234567890</p>
                <p><strong>Manufacturer:</strong> Dell</p>
                <p><strong>Model:</strong> Inspiron 15</p>
                <p><strong>Status:</strong><span className="device-status">Inactive</span></p>
              </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Devices;
