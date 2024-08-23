import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../services/api";
import { FaHome, FaLaptop, FaUser, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { FaLaptopFile, FaComputer } from "react-icons/fa6";
import LoadingSpinner from "./LoadingSpinner";
import '../styles/Sidebar.css';
import logo from "../assets/logo.svg";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeItem, setActiveItem] = useState('home');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isLoggingOut) {
      setCollapsed(false); // Expand sidebar during logout
      timer = setTimeout(async () => {
        try {
          await logout();
          navigate('/login');
        } catch (error) {
          console.error('Logout failed:', error);
          setIsLoggingOut(false);
        }
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isLoggingOut, navigate]);

  const handleLogout = () => {
    setIsLoggingOut(true);
  };

  return (
    <div
      className={`sidebar ${collapsed && !isLoggingOut ? 'collapsed' : ''}`}
      onMouseEnter={() => !isLoggingOut && setCollapsed(false)}
      onMouseLeave={() => !isLoggingOut && setCollapsed(true)}
    >
      <div className="top-sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="AssetSync Logo" />
        </div>
        <div
          className={`sidebar-item ${activeItem === 'home' ? 'active' : ''}`} 
          onClick={() => setActiveItem('home')}
        >
          <Link to="/home">
            <FaHome className="icon" /> <span className="sidebar-text">Home</span>
          </Link>
        </div>
        <div
          className={`sidebar-item ${activeItem === 'request' ? 'active' : ''}`} 
          onClick={() => setActiveItem('request')}
        >
          <Link to="/request">
            <FaLaptop className="icon" /> <span className="sidebar-text">My Requests</span>
          </Link>
        </div>
        <div
          className={`sidebar-item ${activeItem === 'devices' ? 'active' : ''}`} 
          onClick={() => setActiveItem('devices')}
        >
          <Link to="/devices">
            <FaComputer className="icon" /> <span className="sidebar-text">Devices</span>
          </Link>
        </div>
        <div
          className={`sidebar-item ${activeItem === 'requests' ? 'active' : ''}`} 
          onClick={() => setActiveItem('requests')}
        >
          <Link to="/requests">
            <FaLaptopFile className="icon" /> <span className="sidebar-text">Requests</span>
          </Link>
        </div>
        <div
          className={`sidebar-item ${activeItem === 'employees' ? 'active' : ''}`} 
          onClick={() => setActiveItem('employees')}
        >
          <Link to="/employees">
            <FaUsers className="icon" /> <span className="sidebar-text">Employees</span>
          </Link>
        </div>
        <div
          className={`sidebar-item ${activeItem === 'profile' ? 'active' : ''}`} 
          onClick={() => setActiveItem('profile')}
        >
          <Link to="/profile">
            <FaUser className="icon" /> <span className="sidebar-text">Profile</span>
          </Link>
        </div>
      </div>

      <div className="bottom-sidebar">
        <button
          className={`sidebar-item logout-button ${isLoggingOut ? 'logging-out' : ''}`}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <>
              <LoadingSpinner size={20} color="#ffffff" />
              <span className="sidebar-text" style={{ marginLeft: '10px' }}>Logging out...</span>
            </>
          ) : (
            <>
              <FaSignOutAlt className="icon" />
              <span className="sidebar-text">Logout</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;