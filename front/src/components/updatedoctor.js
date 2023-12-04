import React, { useState } from "react";
import '../styles/doctor.css'
export default function UpdateDoctorForm() {
  const [formData, setFormData] = useState({
    username:"",
    email: "",
    hourlyRate: "",
    affiliation: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if( formData.username === ""){
      return setMessage("Please enter a Valid Doctor Username");
    }
    if(formData.affiliation === "" &&formData.hourlyRate === "" &&formData.email === "" ){

      return setMessage("Please enter at Least one attribute to be updated")
    }


    try {
      const response = await fetch("http://localhost:4000/api/doctor", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Doctor information updated successfully.");
         setFormData({
           username:"",
           email: "",
           hourlyRate: "",
           affiliation: "",
         });
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to update doctor information.");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
      setMessage("An error occurred while updating doctor information.");
    }
  };

  return (
    <div className="input-section">
      <h1>Update Doctor Information</h1>
      <form onSubmit={handleSubmit}>
      <div >
          <label>Username :</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div >
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div >
          <label>Hourly Rate in $ :</label>
          <input
            type="number"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
          />
        </div>
        <div >
          <label>Affiliation :</label>
          <input
            type="text"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="button-78">Update</button>
      </form>
      {message && <div className="Message"  >{message} </div>}
    </div>
  );
}