import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPasswordPage from './pages/mainPasswordPage';
import axios from 'axios';
import { UserContextProvider } from '../context/userContext.tsx';

const api = axios.create({
  baseURL: 'https://passowrd-manager-server-git-main-nishan-dhaliwals-projects.vercel.app',
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request:', config);
    return config;
  },
  (error) => {
    console.log('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.log('Response Error:', error);
    if (error.code === 'ECONNABORTED') {
      console.log('Request timed out');
    }
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);


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