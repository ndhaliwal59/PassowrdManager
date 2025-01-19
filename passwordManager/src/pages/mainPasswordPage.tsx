import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './MainPasswordPage.css';
import Header from '../components/header.tsx'
import PasswordSearch from '../components/PasswordSearch.tsx'
import SortPassword from '../components/SortPassword.tsx'
import NewPassword from '../components/NewPassword.tsx'
import PasswordTable from '../components/PasswordTable.tsx'

export type PasswordEntry = {
  website: string;
  username: string;
  password: string;
  strength: string;
};

const MainPasswordPage: React.FC = () => {

  const navigate = useNavigate();

  const [passwords, setPasswords] = useState<PasswordEntry[]>([
  ]);

  const addPassword = (newPassword: Omit<PasswordEntry, "strength">) => {
    // Calculate password strength (example logic)
    const strength = newPassword.password.length >= 8 ? "Strong" : "Weak";
    setPasswords((prev) => [...prev, { ...newPassword, strength }]);
  };

  const handleLogout = () => {
    navigate('/');
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