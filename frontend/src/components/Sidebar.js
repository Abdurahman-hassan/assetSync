import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaLaptop, FaUser, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { FaLaptopFile, FaComputer } from "react-icons/fa6";
import '../styles/Sidebar.css';
import logo from "../assets/logo.svg";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeItem, setActiveItem] = useState('home');

  return (
    <div
    className={`sidebar ${collapsed ? 'collapsed' : ''}`}
    onMouseEnter={() => setCollapsed(false)}
    onMouseLeave={() => setCollapsed(true)}
  >
    <div className="top-sidebar">
      <div className="sidebar-logo">
          <img src={logo} alt="AssetSync Logo" />
      </div>
      <div
        className={`sidebar-item ${activeItem === 'home' ? 'active' : ''}`} 
        onClick={() => setActiveItem('home')}
      >
          <Link to="/Home">
          <FaHome className="icon" /> {collapsed ? '' : <span className="sidebar-text">Home</span>}
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeItem === 'request' ? 'active' : ''}`} 
        onClick={() => setActiveItem('request')}
      >
          <Link to="/request">
          <FaLaptop className="icon" /> {collapsed ? '' : <span className="sidebar-text">My Requests</span>}
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeItem === 'devices' ? 'active' : ''}`} 
        onClick={() => setActiveItem('devices')}
      >
          <Link to="/devices">
          <FaComputer className="icon" /> {collapsed ? '' : <span className="sidebar-text">Devices</span>}
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeItem === 'requests' ? 'active' : ''}`} 
        onClick={() => setActiveItem('requests')}
      >
          <Link to="/requests">
          <FaLaptopFile className="icon" /> {collapsed ? '' : <span className="sidebar-text">Requests</span>}
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeItem === 'employees' ? 'active' : ''}`} 
        onClick={() => setActiveItem('employees')}
      >
          <Link to="/employees">
          <FaUsers className="icon" /> {collapsed ? '' : <span className="sidebar-text">Employees</span>}
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeItem === 'profile' ? 'active' : ''}`} 
        onClick={() => setActiveItem('profile')}
      >
          <Link to="/profile">
          <FaUser className="icon" /> {collapsed ? '' : <span className="sidebar-text">Profile</span>}
        </Link>
      </div>
    </div>

    <div className="bottom-sidebar">
      <div
        className={`sidebar-item ${activeItem === 'Logout' ? 'active' : ''}`} 
        onClick={() => setActiveItem('Logout')}
      >
          <Link to="/Logout">
          <FaSignOutAlt className="icon" /> {collapsed ? '' : <span className="sidebar-text">Logout</span>}
        </Link>
      </div>
    </div>
  </div>
  );

}

export default Sidebar;
