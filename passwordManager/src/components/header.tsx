import React from "react";
import "./header.css";
import logo from '../assets/image-removebg-preview-2.png'

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
      <div className="logo">
        <img src = {logo} alt="Logo" />
      </div>
    </header>
  );
};

export default Header;
