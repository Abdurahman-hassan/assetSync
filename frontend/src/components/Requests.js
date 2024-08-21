import { useState } from "react";
import RequestList from "./RequestList";
import "../styles/Requests.css";

const requestsList = [
  { id: 1, title: "Request 1", summary: "Summary of Request 1Summary of Request 1Summary of Request 1Summary of Request 1Summary of Request 1Summary of Request 1", details: "Detailed information about Request 1 Detailed information about Request 1 Detailed information about Request 1 " },
  { id: 2, title: "Request 2", summary: "Summary of Request 2", details: "Detailed information about Request 2" },
  { id: 2, title: "Request 2", summary: "Summary of Request 2", details: "Detailed information about Request 2" },
  { id: 2, title: "Request 2", summary: "Summary of Request 2", details: "Detailed information about Request 2" },
  { id: 2, title: "Request 2", summary: "Summary of Request 2", details: "Detailed information about Request 2" },
  { id: 2, title: "Request 2", summary: "Summary of Request 2", details: "Detailed information about Request 2" },
  { id: 2, title: "Request 2", summary: "Summary of Request 2", details: "Detailed information about Request 2" },
  { id: 2, title: "Request 2", summary: "Summary of Request 2", details: "Detailed information about Request 2" },
  { id: 2, title: "Request 2", summary: "Summary of Request 2", details: "Detailed information about Request 2" },
  { id: 2, title: "Request 2", summary: "Summary of Request 2", details: "Detailed information about Request 2" },
  { id: 2, title: "Request 2", summary: "Summary of Request 2", details: "Detailed information about Request 2" },
  { id: 2, title: "Request 2", summary: "Summary of Request 2", details: "Detailed information about Request 2" },
  { id: 2, title: "Request 2", summary: "Summary of Request 2", details: "Detailed information about Request 2" },
  { id: 2, title: "Request 2", summary: "Summary of Request 2", details: "Detailed information about Request 2" },
];

const Requests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
  };

  return (
    <div className="requests-container">
      {!selectedRequest ? (
        <div className="request-list">
          {requestsList.map((request) => (
            <RequestList key={request.id} request={request} onClick={handleRequestClick} />
          ))}
        </div>
      ) : (
        <div className="request-details">
          <h2>{selectedRequest.title}</h2>
          <p>{selectedRequest.details}</p>
          <button onClick={() => setSelectedRequest(null)}>Back</button>
        </div>
      )}
    </div>
  );
}

export default Requests;
