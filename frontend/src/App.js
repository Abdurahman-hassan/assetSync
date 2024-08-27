import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import AddDevicePage from './pages/AddDevice';
import DeviceDetails from './pages/DeviceDetails';
import UpdateDevice from './pages/UpdateDevice';
import Notifications from './pages/Notifications';
import NotificationDetails from './pages/NotificationDetails';
import Requests from './pages/Requests';
import RequestDetails from './pages/RequestDetails';

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
            <Route path="/" element={<Navigate to="/my-requests" replace />} />
            <Route path="/my-requests" element={<Layout><MyRequests /></Layout>} />
            <Route path="/devices" element={<Layout><Devices /></Layout>} />
            <Route path="/devices/add-device" element={<Layout><AddDevicePage /></Layout>} />
            <Route path="/devices/:id" element={<Layout><DeviceDetails /></Layout>} />
            <Route path="/devices/:id/update-device" element={<Layout><UpdateDevice /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/profile/reset-password" element={<ResetPassword />} />
            <Route path="/my-requests" element={<Layout><MyRequests /></Layout>} />
            {/* <Route path="/my-requests/:id" element={<Layout><MyRequests /></Layout>} /> */}
            <Route path="/my-requests/request-device/:deviceId?" element={<Layout><RequestDevice /></Layout>} />
            <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
            <Route path="/notifications/:id" element={<Layout><NotificationDetails /></Layout>} />
            <Route path="/requests" element={<Layout><Requests /></Layout>} />
            <Route path="/requests/:id" element={<Layout><RequestDetails /></Layout>} />
            {/* Add more protected routes here */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;