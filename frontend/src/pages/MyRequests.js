import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { getMyRequests } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/MyRequests.css';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async (url = null) => {
    setIsLoading(true);
    try {
      const response = await getMyRequests(url);
      setRequests(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      setIsLoading(false);
    }
  };

  // const handleRequestClick = (requestId) => {
  //   navigate(`/my-requests/${requestId}`);
  // };

  const handleNextPage = () => {
    if (nextPage) {
      fetchRequests(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchRequests(previousPage);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="my-requests-container">
      <div className="my-requests-header">
        <h1>My Requests</h1>
        {/* <button className="request-device-button" onClick={() => navigate('/my-requests/request-device')}>
          Request a Device
        </button> */}
      </div>
      {requests.length === 0 ? (
        <div className="no-requests-message">You don't have any requests yet.</div>
      ) : (
        <>
          <div className="requests-list">
            {requests.map((request) => (
              <div
                key={request.id}
                className="request-item"
                // onClick={() => handleRequestClick(request.id)}
              >
                <h3>{request.request_type}</h3>
                <p>Status: {request.status}</p>
                <p>Requested at: {new Date(request.requested_at).toLocaleString()}</p>
                {request.processed_at && (
                  <p>Processed at: {new Date(request.processed_at).toLocaleString()}</p>
                )}
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

export default MyRequests;
