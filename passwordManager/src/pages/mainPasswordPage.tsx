import React from "react";
import './MainPasswordPage.css';
import Header from '../components/header.tsx'
import PasswordSearch from '../components/PasswordSearch.tsx'
import SortPassword from '../components/SortPassword.tsx'

type TableRow = {
  website: number;
  username: string;
  password: number;
  strength: string;
  city: string;
};

const MainPasswordPage: React.FC = () => {
  const data: TableRow[] = [
    { website: 1, username: "John Doe", password: 30, strength: "john@example.com", city: "New York" },
    { website: 2, username: "Jane Smith", password: 25, strength: "jane@example.com", city: "Los Angeles" },
    { website: 3, username: "Mike Johnson", password: 35, strength: "mike@example.com", city: "Chicago" },
  ];

  return (
    <>
    <Header title="Password Manager"/>
    <div style={{display: "flex", justifyContent: 'space-around'}}>
      <div className="passwordDiv">
        <h2>Passwords</h2>
        <div className="searchAndSortDiv">
          <div className="searchAndSortDivInner">
            <h3>Search: </h3>
            <PasswordSearch/>
          </div>
          <div className="searchAndSortDivInner">
            <h3>Sort By:</h3>
            <SortPassword/>
          </div>
        </div>
        <table style={{ borderCollapse: "collapse", width: "95%" }}>
          <thead>
            <tr>
              <th className ="th">Website</th>
              <th className ="th">Username</th>
              <th className ="th">Password</th>
              <th className ="th">Strength</th>
              <th className ="th">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.website} className ="tr">
                <td className ="td">{row.website}</td>
                <td className ="td">{row.username}</td>
                <td className ="td">{row.password}</td>
                <td className ="td">{row.strength}</td>
                <td className ="td">{row.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="newPasswordDiv">
        <h2>Add New Password</h2>
        <div>
          <h3>Website</h3>
          <input type="text" className="newPasswordTextFeild"/>
        </div>
        <div>
          <h3>Username</h3>
          <input type="text" className="newPasswordTextFeild"/>
        </div>
        <div>
          <h3>Password</h3>
          <input type="text" className="newPasswordTextFeild"/>
        </div>
        <button className="addPasswordButton">Add Password</button>
      </div>
    </div>
    </>
  );
};

export default MainPasswordPage;