import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Employees.css';

const Employees = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <>
      <div className="employees table-list">
        <div className="page-header table-list-header">
          <h1>Employees</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>username</th>
              <th>Email</th>
              <th>Team</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-list-row" onClick={() => navigate('/employees/employee-details')}>
              <td>1</td>
              <td>John Doe</td>
              <td>john.doe</td>
              <td>john.doe@example.com</td>
              <td>Team 1</td>
              <td>Admin</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Doe</td>
              <td>jane.doe</td>
              <td>jane.doe@example.com</td>
              <td>Team 2</td>
              <td>User</td>
            </tr>
            <tr>
              <td>3</td>
              <td>John Smith</td>
              <td>john.smith</td>
              <td>john.smith@example.com</td>
              <td>Team 3</td>
              <td>Admin</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Jane Smith</td>
              <td>jane.smith</td>
              <td>jane.smith@example.com</td>
              <td>Team 4</td>
              <td>User</td>
            </tr>
            <tr>
              <td>5</td>
              <td>John Doe</td>
              <td>john.doe</td>
              <td>john.doe@example.com</td>
              <td>Team 5</td>
              <td>Admin</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Jane Doe</td>
              <td>jane.doe</td>
              <td>jane.doe@example.com</td>
              <td>Team 6</td>
              <td>User</td>
            </tr>
            <tr>
              <td>7</td>
              <td>John Smith</td>
              <td>john.smith</td>
              <td>john.smith@example.com</td>
              <td>Team 7</td>
              <td>Admin</td>
            </tr>
            <tr>
              <td>8</td>
              <td>Jane Smith</td>
              <td>jane.smith</td>
              <td>jane.smith@example.com</td>
              <td>Team 8</td>
              <td>User</td>
            </tr>
            </tbody>
        </table>
        </div>
    </>
  );
}

export default Employees;
