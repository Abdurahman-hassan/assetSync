import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaLaptop, FaUser } from "react-icons/fa";
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
        className={`sidebar-item ${activeItem === 'requests' ? 'active' : ''}`} 
        onClick={() => setActiveItem('requests')}
      >
          <Link to="/requests">
          <FaLaptop className="icon" /> {collapsed ? '' : <span className="sidebar-text">My Requests</span>}
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
  );

}

export default Sidebar;
