import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPasswordPage from './pages/mainPasswordPage';
import axios from 'axios';
import { UserContextProvider } from '../context/userContext.tsx';

axios.defaults.baseURL = 'https://passowrd-manager-server-git-main-nishan-dhaliwals-projects.vercel.app';
axios.defaults.withCredentials = true;

// Add request interceptor for debugging
axios.interceptors.request.use(request => {
  console.log('Request:', request);
  return request;
}, error => {
  console.log('Request Error:', error);
  return Promise.reject(error);
});

// Add response interceptor for debugging
axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  console.log('Response Error:', error);
  return Promise.reject(error);
});

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