import "../styles/RequestList.css";

const RequestList = ({ request, onClick }) => {
  return (
    <div className="request-container" onClick={() => onClick(request)}>
      <h2>{request.title}</h2>
      <p>{request.summary}</p>
    </div>
  );
}

export default RequestList;
