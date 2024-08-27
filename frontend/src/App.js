import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import SuccessfulActivate from './pages/SuccessfulActivate';
import SuccessfulRegister from './pages/SuccessfulRegister';
import Profile from './pages/Profile';
import Devices from './pages/Devices';
import PrivateRoute from './routes/PrivateRoute';
import ResetPassword from './pages/ResetPassword';
import MyRequests from './pages/MyRequests';
import RequestDevice from './pages/RequestDevice';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activate" element={<SuccessfulActivate />} />
          <Route path="/success-register" element={<SuccessfulRegister />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout><Devices /></Layout>} />
            <Route path="/devices" element={<Layout><Devices /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/profile/reset-password" element={<ResetPassword />} />
            <Route path="/my-requests" element={<Layout><MyRequests /></Layout>} />
            <Route path="/my-requests/request-device" element={<Layout><RequestDevice /></Layout>} />
            {/* Add more protected routes here */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;