import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function TheirRecords(){
    const { patientId } = useParams();
    const [healthRecords, setHealthRecords] = useState([]);
    const [newRecord, setnewRecord] = useState({ doctorNotes: "" , description: "" });
    const [healthAdded, sethealthAdded] = useState(false);
    useEffect(() => {
        // Fetch health records for the specified patient_id
        const fetchHealthRecords = async () => {
          const response = await fetch("http://localhost:4000/api/doctor/healthrecords/" + patientId, {
            method: "GET",
          });
    
          if (response.ok) {
            const records = await response.json();
            setHealthRecords(records);
            sethealthAdded(false);
          } else {
            // Handle error
            console.error('Error fetching health records');
          }
        };
    
        fetchHealthRecords();
      }, [healthAdded,patientId]);


      const handleDownloadFile = async (recordId) => {
        try {
          const res = await axios.get(
            `http://localhost:4000/api/patient/download/${recordId}`,
            { responseType: "blob" }
          );
          const blob = new Blob([res.data], { type: res.data.type });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "healthDocument";
          link.click();
        } catch (error) {
          alert("No file available for download");
          console.log(error);
        }
      };

      const handleAddHealth = async () => {
        try {
          const res = await axios.post(
            `http://localhost:4000/api/doctor/healthrecords/${patientId}`,
            {
              doctorNotes: newRecord.doctorNotes,
              description: newRecord.description
            },
            {
              withCredentials: true
            }
          );
          setnewRecord({ doctorNotes: "", description: "" });
          sethealthAdded(true);
        } catch (error) {
          console.log("Error response:", error.response);
          console.log("Error data:", error.response.data);
        }
      };
      
          

    return(
      <div className="health-records-container">
      <h2 className="health-records-title">Health Records Page</h2>
      <div className="form-container">
      <h5 className="Add-health-records-title">Add new health record</h5> 
                <input
          type="text"
          placeholder="doctorNotes"
          value={newRecord.doctorNotes}
          onChange={(e) =>
            setnewRecord({ ...newRecord, doctorNotes: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="description"
          value={newRecord.description}
          onChange={(e) =>
            setnewRecord({ ...newRecord, description: e.target.value })
          }
        />
                <button className="download-button" onClick={handleAddHealth}>Add</button>
            </div>
      {healthRecords.length === 0 ? (
        <p>No health records available for this patient.</p>
      ) : (
        <ul className="health-records-list">
          {healthRecords.map((record) => (
            <li key={record._id} className="health-record-item">
              <div className="health-record-frame">
              <p><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
              <p><strong>By:</strong> {record.by}</p>
              <p><strong>Description:</strong> {record.description}</p>
              <p><strong>Doctor Notes:</strong> {record.doctorNotes}</p>
              <button className="download-button" onClick={() => handleDownloadFile(record._id)}>
                Download File (if available)
              </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    )
}




