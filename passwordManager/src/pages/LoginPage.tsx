import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header.tsx'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Login attempted with:', username, password);
    navigate('/mainPage');
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
