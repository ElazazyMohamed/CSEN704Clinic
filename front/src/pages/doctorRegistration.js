import React, { useState } from 'react';


function DoctorRegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    hourlyRate: '',
    affiliation: '',
    educationBg: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    // You can validate the data and make an API request to register the user or doctor
    // Example: axios.post('/api/register', formData)
    const response = await fetch("http://localhost:4000/api/doctor", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const json = await response.json();
    if (!response.ok){
      alert(json.error);
    }
    if (response.ok){
      alert("Doctor Registered Successfully");
    }
  };

  return (
    <div className='register'>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Username */}
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

        {/* Name */}
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

        {/* Email */}
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

        {/* Password */}
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

        {/* Date of Birth */}
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        {/* Gender */}
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

        {/* Phone Number */}
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

        {/* Hourly Rate (for doctors) */}
        <div>
          <label>Hourly Rate:</label>
          <input
            type="number"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Affiliation (for doctors) */}
        <div>
          <label>Affiliation:</label>
          <input
            type="text"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleChange}
            required
          />
        </div>

        {/* Education Background (for doctors) */}
        <div>
          <label>Education Background:</label>
          <input
            type="text"
            name="educationBg"
            value={formData.educationBg}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default DoctorRegistrationForm;
