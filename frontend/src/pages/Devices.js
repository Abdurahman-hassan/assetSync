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
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  useEffect(() => {
    const superuserStatus = localStorage.getItem('isSuperuser') === 'true';
    setIsSuperuser(superuserStatus);
    fetchDevices();
  }, []);

  const fetchDevices = async (url = null) => {
    setIsLoading(true);
    try {
      const response = await getAllDevices(url);
      console.log(response.data);
      setDevices(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching devices:', error);
      setDevices([]);
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchDevices(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchDevices(previousPage);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="devices">
      <div className="page-header devices-header">
        <h1>Devices</h1>
        {isSuperuser && (
          <button
            className="button add-device-button"
            onClick={() => navigate('/devices/add-device')}
          >
            Add Device
          </button>
        )}
      </div>
      {devices.length === 0 ? (
        <div className="no-devices-message">There are no available devices.</div>
      ) : (
        <>
          <div className="devices-items page-items">
            {devices.map((device) => (
              <div
                key={device.id}
                className="device-item page-item"
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
                <div className="device-actions">
                  <button className="device-actions-button" onClick={() => navigate(`/devices/${device.id}`)}>View Details</button>
                  <button className="device-actions-button" onClick={() => navigate(`/my-requests/request-device`, { state: { deviceId: device.id } })}>
                    Request Device
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button className="prev-button" onClick={handlePreviousPage} disabled={!previousPage}>Previous</button>
            <button className="next-button" onClick={handleNextPage} disabled={!nextPage}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Devices;
