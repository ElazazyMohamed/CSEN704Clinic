import React, { useState, useEffect} from "react";
import axios from 'axios'
export default function PatientDoctors(){
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [doctorName, setdoctorName] = useState("");
    const [speciality, setspeciality] = useState("");

    useEffect(() => {
        // Fetch user's appointments from your backend API
        handleFetchAppointments();
      },[]);
    
      const handleFetchAppointments = async () => {
        // Make an API request to fetch appointments for the patient
        const response = await fetch("http://localhost:4000/api/doctor/", {
        });
    
        if (response.ok) {
          setAppointments(await response.json());
        } else {
          setAppointments([]);
        }
      };
    
      const handleFilterAppointments = () => {
        // Filter appointments based on selected date range and status
        const filtered = appointments.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          const startDateObj = new Date(startDate);
          const endDateObj = new Date(endDate);
          
          if (
            (!startDate || !endDate || (startDateObj <= appointmentDate && appointmentDate <= endDateObj)) &&
            (!selectedStatus || appointment.status === selectedStatus)
          ) {
            return true;
          }
          return false;
        });
    
        setFilteredAppointments(filtered);
      };
      const handleFetchDoctors = () => {
        axios.get("http://localhost:4000/api/patient/searchDoc/?doctorName="+doctorName)
        .then((response) => {
            setUsers(response.data);
        }).catch((error)=>
        {
            console.log(error)
        })
        axios.get("http://localhost:4000/api/patient/searchDoc/?speciality="+speciality)
        .then((response) => {
            setUsers(response.data);
        }).catch((error)=>
        {
            console.log(error)
        })
      };
    
      const handleInputChange = (e) => {
        setdoctorName(e.target.value);
        setspeciality(e.target.value);
      };
    
    useEffect(() => {
        // Fetch user data from your backend API
        axios
          .get("http://localhost:4000/api/doctor") // Replace '/api/users' with the actual API endpoint
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setAppointments(user.availability)
        setFilteredAppointments(user.availability)
      };
      const handleReserveAppointment = async (appointment,reservetype) => {
        // Implement the logic to reserve the appointment, e.g., make an API request
        console.log(`Appointment reserved: ${appointment.date} ${appointment.time}`);
        // Add logic to handle reservation, e.g., make an API request
        try {
          // Make a request to the server for authentication
    
          const response = await fetch("http://localhost:4000/api/patient/reserveappointment", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({appointment,selectedUser,reservetype}),
            credentials : `include`
          });

          if(response.ok){
            const data = await response.json();
            console.log(data);
          }



            } catch (error) {
          console.error('Error during reservation:', error);
        }
      };
    
    return(


        <div>
      <>
      <div className="input-section">
        <label>Search for doctor by Name or speciality: </label>
        <input
          type="text"
          placeholder="Search for a doctor"
          value={doctorName}
          onChange={handleInputChange}
        />
        <button className="button-78" onClick={handleFetchDoctors}>Search</button>
      </div>
      <h2 className="table-name">Doctor List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Hourly Rate</th>
            <th>Affiliation</th>
            <th>Educational Background</th>
            <th>Speciality</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={`user-row ${selectedUser === user ? 'selected' : ''}`}
            >
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.hourlyRate}</td>
              <td>{user.affiliation}</td>
              <td>{user.educationBg}</td>
              <td>{user.speciality}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Availability</h2>
        <label>Filter by Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>Filter by End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <label>Filter by Speciality:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="scheduled">Nothing</option>
          <option value="completed">Heart</option>
          <option value="canceled">Eye</option>
        </select>
        <button className="button-78" onClick={handleFilterAppointments}>View Doctors</button>
        <button className="button-78" onClick={handleFetchAppointments}>Reset Filters</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Action</th>

            {/* Add other appointment-related columns here */}
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0
            ? filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{selectedUser.name}</td>
                  {/* <td>
                    <button onClick={() => handleReserveAppointment(appointment)}>
                      Reserve
                    </button>
                  </td> */}
                    <td className="table-buttons">
                    <button onClick={() => handleReserveAppointment(appointment, "self")}>
                      Reserve for Self
                    </button>
                    <button onClick={() => handleReserveAppointment(appointment, "family")}>
                      Reserve for Family Member
                    </button>
                  </td>
                 
                  {/* Add other appointment-related fields here */}
                </tr>
              ))
            : (
              <tr>
                <td colSpan="3">No matching appointments found.</td>
              </tr>
            )}
        </tbody>
      </table>
    </>
    </div>)
}