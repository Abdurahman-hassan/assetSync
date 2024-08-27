import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssetRequests } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Requests.css';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const navigate = useNavigate();

  const fetchRequests = useCallback(async (url = null) => {
    setIsLoading(true);
    try {
      const response = await getAssetRequests(url);
      setRequests(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleRequestClick = (requestId) => {
    navigate(`/requests/${requestId}`);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="requests-container">
      <h1>Asset Requests</h1>
      <div className="requests-list">
        {requests.map(request => (
          <div key={request.id} className="request-item" onClick={() => handleRequestClick(request.id)}>
            <p><strong>Type:</strong> {request.request_type}</p>
            <p><strong>Status:</strong> {request.status}</p>
            <p><strong>Requested at:</strong> {new Date(request.requested_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => fetchRequests(previousPage)} disabled={!previousPage}>Previous</button>
        <button onClick={() => fetchRequests(nextPage)} disabled={!nextPage}>Next</button>
      </div>
    </div>
  );
};

export default Requests;
