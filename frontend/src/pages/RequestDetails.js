import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAssetRequestById } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Requests.css';

const RequestDetails = () => {
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequestDetails = async () => {
      setIsLoading(true);
      try {
        const response = await getAssetRequestById(id);
        setRequest(response.data);
      } catch (error) {
        console.error('Error fetching request details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;
  if (!request) return <div>Request not found</div>;

  return (
    <div className="request-details-container">
      <h1>Request Details</h1>
      <div className="request-details">
        <p><strong>Type:</strong> {request.request_type}</p>
        <p><strong>Status:</strong> {request.status}</p>
        <p><strong>Description:</strong> {request.description}</p>
        <p><strong>Requested at:</strong> {new Date(request.requested_at).toLocaleString()}</p>
        {request.processed_at && (
          <p><strong>Processed at:</strong> {new Date(request.processed_at).toLocaleString()}</p>
        )}
        {request.device && (
          <p><strong>Device:</strong> {request.device}</p>
        )}
      </div>
      <button className="back-button" onClick={() => navigate('/requests')}>Back to Requests</button>
    </div>
  );
};

export default RequestDetails;
