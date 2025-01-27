import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header.tsx'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        username, password
      })
      if (response.data.success) {
        setUsername('');
        setPassword('');
        navigate('/mainPage');
      } else {
        console.error('Error:', response.data.error || 'Login failed');
        alert(response.data.error || 'Login failed'); // Optional: Display the error to the user
      }
    } catch (error: any) {
      console.error('Login request failed:', error.message);
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="login-page">
      <Header title="Password Manager"/>
      <div className="login-form-container">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
        <button className="signup-btn" onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default LoginPage;
