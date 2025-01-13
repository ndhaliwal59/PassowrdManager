import React from "react";
import './MainPasswordPage.css';

type TableRow = {
  id: number;
  name: string;
  age: number;
  email: string;
  city: string;
};

const MainPasswordPage: React.FC = () => {
  const data: TableRow[] = [
    { id: 1, name: "John Doe", age: 30, email: "john@example.com", city: "New York" },
    { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com", city: "Los Angeles" },
    { id: 3, name: "Mike Johnson", age: 35, email: "mike@example.com", city: "Chicago" },
  ];

  return (
    <div>
      <h1>Sample Table</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th className ="th">ID</th>
            <th className ="th">Name</th>
            <th className ="th">Age</th>
            <th className ="th">Email</th>
            <th className ="th">City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className ="tr">
              <td className ="td">{row.id}</td>
              <td className ="td">{row.name}</td>
              <td className ="td">{row.age}</td>
              <td className ="td">{row.email}</td>
              <td className ="td">{row.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainPasswordPage;