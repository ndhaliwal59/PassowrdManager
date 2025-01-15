import React from "react";
import "./SortPassword.css";

const SortPassword: React.FC = () => {
  return (
    <select className="sortByOptions">
      <option value="Oldest">Oldest</option>
      <option value="Newest">Newest</option>
      <option value="Website Name">Website Name</option>
    </select>
  );
};

export default SortPassword;