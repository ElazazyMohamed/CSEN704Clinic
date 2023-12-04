import React, { useState } from "react";
 import '../styles/doctor.css'

function DeletePackageForm() {
  
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({type: "",});
  
    const handleSubmit = async (e) => {
    e.preventDefault();

    if( formData.type === ""){
        return setMessage("Please enter a Valid Package Type");
      }

      try {
        const response = await fetch("http://localhost:4000/api/package", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          setMessage("Package Deleted successfully.");
          console.log(response.json().error)
           setFormData({
             type:"",
           });
        } else {
          const data = await response.json();
          setMessage(data.error || "Failed to delete Package " + data.error);
        }
      } catch (error) {
        setMessage("An error occurred while deleting Package . "+error);
      }
    
  };

  return (
    <div className="input-section">
    <form onSubmit={handleSubmit}>
        <h1>Delete Package</h1>
      <label>Package Type:</label>
      <input
        type="text"
        name="type"
        value={formData.type}
        
        onChange={(e) => setFormData({ type: e.target.value })}
      />
            <button type="submit" className="button-78">Delete Package</button>
    </form>
        {message && <div className="Message"  >{message} </div>}
    </div>
  );
}

export default DeletePackageForm;
