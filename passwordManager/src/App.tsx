import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPasswordPage from './pages/mainPasswordPage';
import axios from 'axios';
import { UserContextProvider } from '../context/userContext.jsx';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/mainPage" element={<MainPasswordPage />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
};

export default App;