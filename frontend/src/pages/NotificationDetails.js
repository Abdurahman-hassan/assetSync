import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNotificationById } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/NotificationDetails.css';

const NotificationDetails = () => {
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchNotificationDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getNotificationById(id);
      setNotification(response.data);
    } catch (error) {
      console.error('Failed to fetch notification details:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchNotificationDetails();
  }, [fetchNotificationDetails]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!notification) {
    return <div>Notification not found.</div>;
  }

  return (
    <div className="notification-details-container">
      <h1>Notification Details</h1>
      <div className="notification-details">
        <p className="notification-message">{notification.message}</p>
        <p className="notification-type">Type: {notification.type}</p>
        <p className="notification-date">Sent at: {new Date(notification.sent_at).toLocaleString()}</p>
      </div>
      <button className="back-button" onClick={() => navigate('/notifications')}>Back to Notifications</button>
    </div>
  );
};

export default NotificationDetails;
