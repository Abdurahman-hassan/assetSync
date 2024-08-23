/**
    * TODO: Add the routes to the app
    * TODO: Routing with User Type Content
    * TODO: Use Private Route to restrict access to the routes
  */

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
            {/* Add more protected routes here */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;