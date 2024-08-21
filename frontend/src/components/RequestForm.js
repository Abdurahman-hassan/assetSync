import { useState } from "react";
import "../styles/RequestForm.css";

const RequestForm = ({ initialData = {}, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [details, setDetails] = useState(initialData.details || "");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "details") {
      setDetails(value);
    }
  };

  const validate = () => {
    const validationErrors = {};

    if (title.trim() === "") {
      validationErrors.title = "Title is required";
    }
    if (details.trim() === "") {
      validationErrors.details = "Details are required";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const requestData = { title, details };
      onSubmit(requestData);
      setErrors({});
    }
  };

  return (
    <div className="request-form-container">
      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Enter the request title"
            className={errors.title ? "error-input" : ""}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="details">Details</label>
          <textarea
            id="details"
            name="details"
            value={details}
            onChange={handleChange}
            placeholder="Enter the request details"
            rows="5"
            className={errors.details ? "error-input" : ""}
          />
          {errors.details && <p className="error">{errors.details}</p>}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default RequestForm;
