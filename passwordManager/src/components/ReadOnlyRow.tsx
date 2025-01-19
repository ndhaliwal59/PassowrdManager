import React from "react";
//import "./ReadOnlyRow.css";

interface RowData {
  website: string;
  username: string;
  password: string;
  strength: string;
}

interface ReadOnlyRowProps {
  index: number;
  row: RowData;
  handleEditClick: (event: React.MouseEvent<HTMLButtonElement>, index: number) => void;
  handleDeleteClick: () => void;
}

const ReadOnlyRow: React.FC<ReadOnlyRowProps> = ({index, row, handleEditClick, handleDeleteClick}) => {
  return (
    <tr key={index} className ="tr">
    <td className ="td">{row.website}</td>
    <td className ="td">{row.username}</td>
    <td className ="td">{row.password}</td>
    <td className ="td">{row.strength}</td>
    <td className ="td">
      <button type="button" onClick={(event)=> handleEditClick(event, index)} > Edit </button>
    </td>
    <td className ="td">
      <button type="button" onClick={handleDeleteClick} style={{backgroundColor: 'red'}}> Delete </button>
    </td>
  </tr>
  );
};

export default ReadOnlyRow;