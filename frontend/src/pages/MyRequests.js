import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyRequests } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/MyRequests.css';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getMyRequests();
      setRequests(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      setIsLoading(false);
    }
  };

  const handleRequestClick = (requestId) => {
    navigate(`/requests/${requestId}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="my-requests-container">
      <div className="my-requests-header">
        <h1>My Requests</h1>
        <button className="request-device-button" onClick={() => navigate('/my-requests/request-device')}>
          Request a Device
        </button>
      </div>
      {requests.length === 0 ? (
        <div className="no-requests-message">You don't have any requests yet.</div>
      ) : (
        <div className="requests-list">
          {requests.map((request) => (
            <div
              key={request.id}
              className="request-item"
              onClick={() => handleRequestClick(request.id)}
            >
              <h3>{request.request_type}</h3>
              <p>Status: {request.status}</p>
              <p>Requested at: {new Date(request.requested_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
