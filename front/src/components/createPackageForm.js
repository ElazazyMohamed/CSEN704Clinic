import React, { useState } from "react";
 import '../styles/doctor.css'


function CreatePackageForm() {
  
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
        
        const response = await fetch("http://localhost:4000/api/package/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setMessage("Error : "+json.error)
    }
    if (response.ok) {
      setMessage("Package Created Successfully");
    }


        setFormData({
          type: "",
          price: "",
          clinicDiscount: "",
          pharmacyDiscount: "",
          familyDiscount: "",
        });
      };



  return (

    <div className="input-section">
    <form onSubmit={handleSubmit}>
      <h1>Create Package</h1>
      <label>Package Type:</label>
      <input
        type="text"
        name="type"
        value={formData.type}
        required
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      />

      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        required
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />

      <label>Clinic Discount:</label>
      <input
        type="number"
        name="clinicDiscount"
        value={formData.clinicDiscount}
        required
        onChange={(e) =>
          setFormData({ ...formData, clinicDiscount: e.target.value })
        }
      />

      <label>Pharmacy Discount:</label>
      <input
        type="number"
        name="pharmacyDiscount"
        value={formData.pharmacyDiscount}
        required
        onChange={(e) =>
          setFormData({ ...formData, pharmacyDiscount: e.target.value })
        }
      />

      <label>Family Discount:</label>
      <input
        type="number"
        name="familyDiscount"
        value={formData.familyDiscount}
        required
        onChange={(e) =>
          setFormData({ ...formData, familyDiscount: e.target.value })
        }
      />

      <button type="submit" className="button-78">Create Package</button>
    </form>
    {message && <div className="Message"  >{message} </div>}
    
    </div>
  );
}

export default CreatePackageForm;
