import React, { useState } from "react";
import { PasswordEntry } from "../pages/mainPasswordPage";
import './EditOnlyRow.css';
import axios from 'axios';
import { calculatePasswordStrength } from "../utility/passwordStrength.ts";

interface EditOnlyRowProps {
  row: PasswordEntry;
  index: number;
  setPasswords: React.Dispatch<React.SetStateAction<PasswordEntry[]>>;
  setEditContact: React.Dispatch<React.SetStateAction<number | null>>;
}

const EditOnlyRow: React.FC<EditOnlyRowProps> = ({ row, index, setPasswords, setEditContact }) => {
  const [editedRow, setEditedRow] = useState(row);
  
  // Calculate current strength based on edited password
  const currentStrength = calculatePasswordStrength(editedRow.password);

  const handleSaveClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if ('_id' in editedRow) {
      try {
        const response = await axios.put('/update-password', {
          id: editedRow._id,
          website: editedRow.website,
          username: editedRow.username,
          password: editedRow.password
        }, {
          withCredentials: true
        });

        if (response.data.success) {
          setPasswords((prev) =>
            prev.map((item) =>
              '_id' in item && item._id === editedRow._id
                ? { ...editedRow, strength: currentStrength }
                : item
            )
          );
          setEditContact(null);
        } else {
          alert('Failed to update password: ' + response.data.error);
        }
      } catch (error) {
        console.error('Error updating password:', error);
      }
    }
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
      <td>{currentStrength}</td>
      <td>
        <button style={{marginRight: '10px'}} onClick={(e) => handleSaveClick(e)}>Save</button>
        <button onClick={() => setEditContact(null)}>Cancel</button>
      </td>
    </tr>
  );
};


export default EditOnlyRow;
