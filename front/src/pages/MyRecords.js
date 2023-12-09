import { useEffect, useState, useRef } from "react"
import axios from 'axios'
export default function MyRecords(){
    const [healthRecords, setHealthRecords] = useState([]);
    const [description, setdescription] = useState("");
    const fileInputRef = useRef(null);
    const [healthAdded, sethealthAdded] = useState(false);
    useEffect(() => {
        // Fetch health records for the specified patient_id
        const fetchHealthRecords = async () => {
          const response = await fetch("http://localhost:4000/api/patient/viewhealthrecords/", {
            credentials: 'include'
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
      }, [healthAdded]);


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

      const handleAddHealth = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append("description", description);
          formData.append("file", fileInputRef.current.files[0]);
      
          const axiosConfig = {
            withCredentials: true,
          };
      
          const res = await axios.post(
            "http://localhost:4000/api/patient/addhealthrecord",
            formData,
            axiosConfig
          );
          
          console.log(res);
          sethealthAdded(true);
        } catch (error) {
          console.log(error);
        }
      };

      const handleDeleteHealth = async (recordId) => {
        try {
          const axiosConfig = {
            withCredentials: true,
          };
          await axios.delete(
            `http://localhost:4000/api/patient/removehealthrecord/${recordId}`,
            axiosConfig
          );
          sethealthAdded(true);
        } catch (error) {
          console.error('Error deleting health record:', error);
        }
      };
    return(
      <div className="health-records-container">
      <h2 className="health-records-title">Health Records Page</h2>
      <div className="form-container">
                <h5 className="Add-health-records-title">Add new health record</h5> 
                <input
          type="text"
          placeholder="add description"
          onChange={(e) => setdescription(e.target.value)}
        />
        <input type="file" ref={fileInputRef} />
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
              <button className="delete-button" style={{ marginLeft: '240px' }} 
              onClick={() => handleDeleteHealth(record._id)}>
                Delete Health Record
              </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    )
}