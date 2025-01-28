import React from "react";
import "./SortPassword.css";

interface SortPasswordProps {
  onSortChange: (sortOption: string) => void;
}

const SortPassword: React.FC<SortPasswordProps> = ({ onSortChange }) => {
  return (
    <select className="sortByOptions" onChange={(e) => onSortChange(e.target.value)}>
      <option value="oldest">Oldest</option>
      <option value="newest">Newest</option>
      <option value="website">Website Name</option>
    </select>
  );
};

export default SortPassword;
