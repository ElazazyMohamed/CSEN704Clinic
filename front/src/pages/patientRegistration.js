/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import "./styles.css"

function PatientRegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    emergencyFullName: "",
    emergencyPhoneNumber: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/patient/createPatient", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      alert(json.error);
    }
    if (response.ok) {
      alert("Patient Registered Successfully");
      window.location.assign('/patient/home');
    }
  };

  return (
    <div className="register">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength="3"
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            minLength="11"
          />
        </div>
        <div>
          <label>Emergency Contact Full Name:</label>
          <input
            type="text"
            name="emergencyFullName"
            value={formData.emergencyFullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Emergency Contact Phone Number:</label>
          <input
            type="tel"
            name="emergencyPhoneNumber"
            value={formData.emergencyPhoneNumber}
            onChange={handleChange}
            required
            minLength="11"
          />
        </div>
        <button className="button" type="submit">Register</button>
      </form>
    </div>
  );
}

export default PatientRegistrationForm;
