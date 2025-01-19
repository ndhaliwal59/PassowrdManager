//import React from "react";
import "./NewPassword.css";
import React, { useState } from 'react';

interface NewPasswordProps {
  addPassword: (newPassword: { website: string; username: string; password: string }) => void;
}


const NewPassword: React.FC<NewPasswordProps> = ({ addPassword }) => {
  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPassword(formData); // Send data to the parent
    setFormData({ website: "", username: "", password: "" }); // Clear form
  };

  return (
    <div className="newPasswordDiv">
      <h2>Add New Password</h2>
      <form onSubmit={handleSubmit} style={{width: '70%'}}>
          <h3>Website</h3>
          <input
            type="text"
            name="website"
            className="newPasswordTextFeild"
            value={formData.website}
            onChange={handleChange}
            required
          />

          <h3>Username</h3>
          <input
            type="text"
            name="username"
            className="newPasswordTextFeild"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <h3>Password</h3>
          <input
            type="text"
            name="password"
            className="newPasswordTextFeild"
            value={formData.password}
            onChange={handleChange}
            required
          />
        <button type="submit" className="addPasswordButton">Add Password</button>
      </form>
    </div>
  );
};

export default NewPassword;


