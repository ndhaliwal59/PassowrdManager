import React from "react";
import "./header.css";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
      <div className="logo">
        <img src="/path-to-your-logo.png" alt="Logo" />
      </div>
    </header>
  );
};

export default Header;
