import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { getNotifications } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
//   const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async (url = null) => {
    setIsLoading(true);
    try {
      const response = await getNotifications(url);
      setNotifications(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setIsLoading(false);
    }
  };

//   const handleNotificationClick = (notificationId) => {
//     navigate(`/notifications/${notificationId}`);
//   };

  const handleNextPage = () => {
    if (nextPage) {
      fetchNotifications(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchNotifications(previousPage);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="notifications-container">
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <div className="no-notifications-message">You don't have any notifications.</div>
      ) : (
        <>
          <div className="notifications-list">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="notification-item"
                // onClick={() => handleNotificationClick(notification.id)}
              >
                <p className="notification-message">{notification.message}</p>
                <p className="notification-type">{notification.type}</p>
                <p className="notification-date">{new Date(notification.sent_at).toLocaleString()}</p>
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

export default Notifications;
