import React, {useState} from "react";
import "./PasswordTable.css";
import { PasswordEntry } from "../pages/mainPasswordPage.tsx";
import ReadOnlyRow from "./ReadOnlyRow.tsx";
import EditOnlyRow from "./EditOnlyRow.tsx";
import axios from 'axios';

interface PasswordTableProps {
  passwords: PasswordEntry[];
  setPasswords: React.Dispatch<React.SetStateAction<PasswordEntry[]>>;
}

const PasswordTable: React.FC<PasswordTableProps> = ({ passwords, setPasswords }) => {

  const [editContact, setEditContact] = useState<number | null>(null);

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    setEditContact(index);
  };

  const handleDeleteClick = async (id: string) => {
    try {
      const response = await axios.delete(`/delete-password/${id}`, {
        withCredentials: true
      });

      if (response.data.success) {
        const updatedPasswords = passwords.filter(password => password._id !== id);
        setPasswords(updatedPasswords);
      } else {
        alert('Failed to delete password: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error deleting password:', error);
      alert('An error occurred while deleting the password');
    }
  };



  return (
    <>
     <form style = {{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <table style={{ borderCollapse: "collapse", width: "95%", marginBottom: "10px" }}>
          <thead>
            <tr>
              <th className ="th">Website</th>
              <th className ="th">Username</th>
              <th className ="th">Password</th>
              <th className ="th">Strength</th>
              <th className ="th">Edit</th>
              <th className ="th">Delete</th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((row, index) => (
              <React.Fragment key={row._id}>
                {editContact === index ? <EditOnlyRow row={row} index={index} setPasswords={setPasswords} setEditContact={setEditContact} /> 
                : <ReadOnlyRow 
                    row = {row} 
                    index = {index} 
                    handleEditClick = {handleEditClick}
                    handleDeleteClick={() => handleDeleteClick(row._id)}
                  />}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </>
  );
};

export default PasswordTable;