import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './MainPasswordPage.css';
import Header from '../components/header.tsx'
import PasswordSearch from '../components/PasswordSearch.tsx'
import SortPassword from '../components/SortPassword.tsx'
import NewPassword from '../components/NewPassword.tsx'
import PasswordTable from '../components/PasswordTable.tsx'
import axios from 'axios';

export type NewPasswordEntry = {
  website: string;
  username: string;
  password: string;
};

export type ExistingPasswordEntry = NewPasswordEntry & {
  _id: string;
  strength: string;
};

export type PasswordEntry = ExistingPasswordEntry;

const MainPasswordPage: React.FC = () => {

  const navigate = useNavigate();

  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const response = await axios.get('/get-passwords', {
        withCredentials: true
      });
      if (response.data.success) {
        setPasswords(response.data.passwords.map((pwd: any) => ({
          ...pwd,
          strength: pwd.password.length >= 8 ? "Strong" : "Weak"
        })));
      } else {
        console.error('Failed to fetch passwords:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  const addPassword = async (newPassword: NewPasswordEntry) => {
    try {
      const response = await axios.post('/add-password', newPassword, {
        withCredentials: true
      });
  
      if (response.data.success) {
        const strength = newPassword.password.length >= 8 ? "Strong" : "Weak";
        const addedPassword: PasswordEntry = {
          ...newPassword,
          _id: response.data.password._id,
          strength
        };
        
        setPasswords((prev) => [...prev, addedPassword]);
      } else {
        alert(response.data.error || 'Failed to add password');
      }
    } catch (error) {
      console.error('Error adding password:', error);
      alert('An error occurred while adding the password');
    }
  };
  
  const handleLogout = async () => {
    try {
      await axios.post('logout', {}, {
        withCredentials: true
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
    <button className="logOutButton" onClick={handleLogout}>Log Out</button>
    <Header title="Password Manager"/>
    <div style={{display: "flex", justifyContent: 'space-around'}}>
      <div className="passwordDiv">
        <h2>Passwords</h2>
        <div className="searchAndSortDiv">
          <div className="searchAndSortDivInner">
            <h3>Seacrh:</h3>
            <PasswordSearch/>
          </div>
          <div className="searchAndSortDivInner">
            <h3>Sort By:</h3>
            <SortPassword/>
          </div>
        </div>
        <PasswordTable passwords={passwords} setPasswords={setPasswords}/>
      </div>
      <NewPassword addPassword={addPassword}/>
    </div>
    </>
  );
};

export default MainPasswordPage;