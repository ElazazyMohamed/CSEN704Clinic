import PrescriptionsTable from "../components/prescriptions";
import React, { useState, useEffect} from "react";

export default function PatientPrescriptions(){
    const [prescriptions,setPrescriptions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserClick = (user) => {
        setSelectedUser(user);
      };
    useEffect(() => {
        // Fetch user data from your backend API
        handleFetchPrescriptions();
      }, []);
      const handleFetchPrescriptions = async () => {
        // Make an API request to fetch family members based on the entered username
        const response = await fetch("http://localhost:4000/api/patient/getprescription/?username=soubky", {
          method: "GET",
        });
    
        if (response.ok) {
          setPrescriptions(await response.json());
        } else {
          const json = await response.json();
          alert(json.error);
          setPrescriptions([]);
        }
      };
    return(
        <div>
<div><PrescriptionsTable/>
      <h2 className="table-name">Prescriptions List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
              <tr
              key={prescription.id}
              onClick={() => handleUserClick(prescription)}
              className={`user-row ${selectedUser === prescription ? 'selected' : ''}`}
              >
              <td>{prescription.name}</td>
              <td>{prescription.price}</td>
              <td>{prescription.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          </div>
    )
}