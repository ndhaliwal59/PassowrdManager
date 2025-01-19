import React, { useState } from "react";
import { PasswordEntry } from "../pages/mainPasswordPage.tsx";
import './EditOnlyRow.css';

interface EditOnlyRowProps {
  row: PasswordEntry;
  index: number;
  setPasswords: React.Dispatch<React.SetStateAction<PasswordEntry[]>>;
  setEditContact: React.Dispatch<React.SetStateAction<number | null>>;
}




const EditOnlyRow: React.FC<EditOnlyRowProps> = ({ row, index, setPasswords, setEditContact }) => {
  const [editedRow, setEditedRow] = useState(row);

  const handleSaveClick = () => {
    setPasswords((prev) =>
      prev.map((item, i) => (i === index ? editedRow : item))
    );
    setEditContact(null);
  };

return (
  <tr>
    <td>
      <input
        value={editedRow.website}
        className="editPasswordsInput"
        onChange={(e) => setEditedRow({ ...editedRow, website: e.target.value })}
      />
    </td>
    <td>
      <input
        value={editedRow.username}
        className="editPasswordsInput"
        onChange={(e) => setEditedRow({ ...editedRow, username: e.target.value })}
      />
    </td>
    <td>
      <input
        value={editedRow.password}
        className="editPasswordsInput"
        onChange={(e) => setEditedRow({ ...editedRow, password: e.target.value })}
      />
    </td>
    <td>{row.strength}</td>
    <td>
      <button onClick={handleSaveClick}>Save</button>
      <button onClick={() => setEditContact(null)}>Cancel</button>
    </td>
    <td>
      
    </td>
  </tr>
);
};

export default EditOnlyRow;