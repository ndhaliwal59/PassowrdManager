import React, { useState, useEffect } from 'react';
import { data, useNavigate } from 'react-router-dom';
import './SignupPage.css';
import Header from '../components/header.tsx'
import bcrypt from 'bcryptjs';
import axios from 'axios';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const validatePassword = (pass: string) => {
    setPasswordFeedback({
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    });
  };

  const isPasswordValid = () => {
    return Object.values(passwordFeedback).every(Boolean);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid()) {
      setError('Invalid Password');
      return;
    }
  
    try {
      const response = await axios.post('/register', {
        username, email, password
      });
      setSuccessMessage('Account created successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error === 'Username already exists') {
          setError('This username is already taken.');
        } else if (error.response.data.error === 'Email already exists') {
          setError('An account with this email already exists.');
        } else {
          setError(error.response.data.error);
        }
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };
  

  const handleSignin = () => {
    navigate('/');
  };

  return (
    <div className="signup-page">
      <Header title="Create an Account"/>
      <div className="signup-form-container">
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="password-feedback">
            <p className={passwordFeedback.length ? 'valid' : 'invalid'}>At least 8 characters</p>
            <p className={passwordFeedback.uppercase ? 'valid' : 'invalid'}>At least 1 uppercase letter</p>
            <p className={passwordFeedback.lowercase ? 'valid' : 'invalid'}>At least 1 lowercase letter</p>
            <p className={passwordFeedback.number ? 'valid' : 'invalid'}>At least 1 number</p>
            <p className={passwordFeedback.special ? 'valid' : 'invalid'}>At least 1 special character</p>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" >Create Account</button>
          {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
        <button className="signin-btn" onClick={handleSignin}>Sign In</button>
      </div>
    </div>
  );
};

export default SignupPage;
