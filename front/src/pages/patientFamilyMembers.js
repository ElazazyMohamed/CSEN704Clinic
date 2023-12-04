import React, { useState} from "react";
import axios from 'axios'
import FamilyMembersTable from "../components/familymemberstable";

export default function PatientFamilyMembers() {
    const [message, setMessage] = useState("");
    const [newFamilyMember, setNewFamilyMember] = useState({
      username:"",
      name: "",
      nationalID: "",
      age: "",
      gender: "male",
      relationToPatient: "child", 
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFamilyMember({
          ...newFamilyMember,
          [name]: value,
        });
      };
  
  
      const handleSubmit = (e) => {
        e.preventDefault();
    
  
        if(newFamilyMember.age==="" || newFamilyMember.gender===""||newFamilyMember.relationToPatient===""
           || newFamilyMember.username===""||newFamilyMember.nationalID===""){
            return setMessage('All Fields MUST be Input')
           }
  
  
        // Send a PATCH request to your backend API to add the new family member
        axios
          .patch("http://localhost:4000/api/patient/addfamily", newFamilyMember) // Replace with the actual API endpoint
          .then((response) => {
            // Handle the response as needed
            console.log("New family member added:", response.data);
            setMessage(response.data.familyMembers.pop().name+" Has been added successfully")
            // Clear the form input fields
        setNewFamilyMember({
          username:"",
          name: "",
          nationalID: "",
          age: "",
          gender: "male",
          relationToPatient: "child", // Reset the relation field
        });
            // You can also update the 'users' state to reflect the changes if needed
          })
          .catch((error) => {
            console.error("Error adding family member:", error);
            setMessage("Error while adding family member")
          });
    
        
      };
    return(
        <div>
          <div><FamilyMembersTable/> </div>
            {/* Add a form for adding a new family member */}
        <form onSubmit={handleSubmit}>
        <h2>Add a New Family Member</h2>
          
        <label>Your Username:</label>
          <input
            type="text"
            name="username"
            value={newFamilyMember.username}
            onChange={handleInputChange}
          />

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newFamilyMember.name}
            onChange={handleInputChange}
          />

          <label>National ID:</label>
          <input
            type="text"
            name="nationalID"
            value={newFamilyMember.nationalID}
            onChange={handleInputChange}
          />

          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={newFamilyMember.age}
            onChange={handleInputChange}
          />

          <label>Gender:</label>
          <select
            name="gender"
            onChange={handleInputChange}
            value={newFamilyMember.gender}
          >
            <option  value="male">Male</option>
            <option  value="female">Female</option>
          </select>

          <label>Relation to Patient:</label>
          <select
            name="relationToPatient"
            onChange={handleInputChange}
            value={newFamilyMember.relationToPatient}
          >
            <option value="wife">Wife</option>
            <option value="husband">Husband</option>
            <option value="child">Child</option>
          </select>

          <button type="submit" className="button-78">Add Family Member</button>
          {message && <div className="Message"  >{message} </div>}
        </form>
        </div>
    )
}