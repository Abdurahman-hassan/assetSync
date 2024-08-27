import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import logo from '../assets/logo192.png';
import '../styles/Devices.css';
import { getDeviceById, deleteDevice } from '../services/api';

const DeviceDetails = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [device, setDevice] = useState(null); 
  const [is_superuser, setIsSuperuser] = useState(false);

  useEffect(() => {
    setIsSuperuser(localStorage.getItem('isSuperuser') === 'true');
  }, []);

  useEffect(() => {
    const fetchDevice = async () =>{
      try {
        const response = await getDeviceById(id);
        setDevice(response.data);
        setIsLoading(false);
      } catch  (error) {
        console.log('Error fetching device details:', error);
        setIsLoading(false);
      }
    };

    fetchDevice();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteDevice(id);
      navigate('/devices');
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="container">
      {device && (
        <>
          <img src={device.photo_url || logo} alt={`${device.manufacturer} ${device.model}`} className="image" />
          <div className="details-container">
            <div className="details">
              <h2 className="title">{device.manufacturer} {device.model}</h2>
              <p className="detail">Serial Number: {device.serial_number}</p>
              <p className="detail">OS: {device.os_type} {device.os_version}</p>
              <p className="detail">CPU: {device.cpu}</p>
              <p className="detail">RAM: {device.ram_total_gb}GB</p>
              <p className="detail">Storage: {device.disk_total_gb}GB</p>
              <p className="detail">Status: <span className={`device-status ${device.status.toLowerCase()}`}>{device.status}</span></p>
            </div>
            {is_superuser && (
              <div className="buttonContainer">
                <button className={"button updateButton"} onClick={() => navigate(`/devices/${id}/update-device`)}>
                  Update
                </button>
                <button className={"button deleteButton"} onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DeviceDetails;