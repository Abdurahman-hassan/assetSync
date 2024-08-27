import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { logout } from "../services/api";
import { FaLaptop, FaUser, FaSignOutAlt, FaBell } from "react-icons/fa";
import { FaLaptopFile, FaComputer } from "react-icons/fa6";
import LoadingSpinner from "./LoadingSpinner";
import '../styles/Sidebar.css';
import logo from "../assets/logo.svg";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const superuserStatus = localStorage.getItem('isSuperuser');
    setIsSuperuser(superuserStatus === 'true');
  }, []);

  useEffect(() => {
    let timer;
    if (isLoggingOut) {
      setCollapsed(false);
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

  const isActive = (path) => {
    if (path === '/my-requests' && location.pathname.startsWith('/requests/')) {
      return true;
    }
    if (path === '/devices' && location.pathname.includes('/devices/')) {
      return true;
    }
    return location.pathname === path;
  };

  const renderSidebarItems = () => {
    const commonItems = [
      { name: 'my-requests', icon: FaLaptop, text: 'My Requests', link: '/my-requests' },
      { name: 'profile', icon: FaUser, text: 'Profile', link: '/profile' },
      { name: 'devices', icon: FaComputer, text: 'Devices', link: '/devices' },
      { name: 'notifications', icon: FaBell, text: 'Notifications', link: '/notifications' },
    ];

    const superuserItems = [
      { name: 'requests', icon: FaLaptopFile, text: 'Requests', link: '/requests' },
    ];

    const items = isSuperuser ? [...superuserItems, ...commonItems] : commonItems;

    return items.map((item) => (
      <div
        key={item.name}
        className={`sidebar-item ${isActive(item.link) ? 'active' : ''}`}
      >
        <Link to={item.link}>
          <item.icon className="icon" /> <span className="sidebar-text">{item.text}</span>
        </Link>
      </div>
    ));
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
        {renderSidebarItems()}
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