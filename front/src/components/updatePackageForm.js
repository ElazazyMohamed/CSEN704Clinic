import React, { useState } from "react";
 import '../styles/doctor.css'


function UpdatePackageForm() {
  
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        type: "",
        price: "",
        clinicDiscount: "",
        pharmacyDiscount: "",
        familyDiscount: "",
      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if( formData.type === ""){
            return setMessage("Please enter a Valid Package Type");
          }
          if(formData.price === "" &&formData.clinicDiscount === "" &&formData.pharmacyDiscount === "" 
                && formData.familyDiscount ===""){
            return setMessage("Please enter at Least one attribute to be updated")
          }
      
      
          try {
            const response = await fetch("http://localhost:4000/api/package", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
      
            if (response.ok) {
              setMessage("Package information updated successfully.");
               setFormData({
                 type:"",
                 price: "",
                 clinicDiscount: "",
                 pharmacyDiscount: "",
                 familyDiscount:""
               });
            } else {
              const data = await response.json();
              setMessage(data.error || "Failed to update Package information." + data.error);
            }
          } catch (error) {
            setMessage("An error occurred while updating Package information."+error);
          }
      };



  return (

    <div className="input-section">
    <form onSubmit={handleSubmit}>
        <h1>Update Package</h1>
      <label>Package Type:</label>
      <input
        type="text"
        name="type"
        value={formData.type}
        
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      />

      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />

      <label>Clinic Discount:</label>
      <input
        type="number"
        name="clinicDiscount"
        value={formData.clinicDiscount}
        
        onChange={(e) =>
          setFormData({ ...formData, clinicDiscount: e.target.value })
        }
      />

      <label>Pharmacy Discount:</label>
      <input
        type="number"
        name="pharmacyDiscount"
        value={formData.pharmacyDiscount}
        
        onChange={(e) =>
          setFormData({ ...formData, pharmacyDiscount: e.target.value })
        }
      />

      <label>Family Discount:</label>
      <input
        type="number"
        name="familyDiscount"
        value={formData.familyDiscount}
        
        onChange={(e) =>
          setFormData({ ...formData, familyDiscount: e.target.value })
        }
      />

      <button type="submit" className="button-78">Update Package</button>
    </form>
    {message && <div className="Message"  >{message} </div>}
    
    </div>
  );
}

export default UpdatePackageForm;
