import React, {useState} from "react";
import "./PasswordTable.css";
import { PasswordEntry } from "../pages/mainPasswordPage.tsx";
import ReadOnlyRow from "./ReadOnlyRow.tsx";
import EditOnlyRow from "./EditOnlyRow.tsx";

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

  const handleDeleteClick = (index: number) => {
    const updatedPasswords = passwords.filter((_, i) => i !== index);
    setPasswords(updatedPasswords);
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
              <>
                {editContact === index ? <EditOnlyRow row={row} index={index} setPasswords={setPasswords} setEditContact={setEditContact} /> 
                : <ReadOnlyRow 
                    row = {row} 
                    index = {index} 
                    handleEditClick = {handleEditClick}
                    handleDeleteClick={() => handleDeleteClick(index)}
                  />}
              </>
            ))}
          </tbody>
        </table>
      </form>
    </>
  );
};

export default PasswordTable;