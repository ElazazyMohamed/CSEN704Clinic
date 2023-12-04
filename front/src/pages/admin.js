import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";
import LogoutButton from "../components/LogoutButton";
import ChangePasswordForm from "../components/ChangePasswordForm";


function AdminPanel() {
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [oldAdmin, deleteAdmin] = useState({ username: ""});
  const [oldDoctor, deleteDoctor] = useState({ username: ""});
  const [oldPatient, deletePatient] = useState({ username: ""});
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    deleteDoctor({username:user.username});
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

  const handleAddAdmin = async (e) => {
    // Send a request to create a new admin with newAdmin.username and newAdmin.password
    // Example: axios.post('/api/admins', newAdmin).then(() => setNewAdmin({ username: '', password: '' }));
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/admin", {
      method: "POST",
      body: JSON.stringify(newAdmin),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      alert(json.error);
    }
    if (response.ok) {
      alert("Admin Registered Successfully");
    }
  };

  const handleRemoveAdmin = async (e) => {
    e.preventDefault();
    // Send a request to remove the user with the given userId
    // Example: axios.delete(`/api/users/${userId}`).then(() => {
    //   // Refresh the adminData after user removal
    // });
    const response = await fetch("http://localhost:4000/api/admin", {
      method: "DELETE",
      body: JSON.stringify(oldAdmin),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      alert(json.error);
    }
    if (response.ok) {
      alert("Admin Deleted Successfully");
    }
  };
  const handleRemoveDoctor = async (e) => {
    e.preventDefault();
    // Send a request to remove the user with the given userId
    // Example: axios.delete(`/api/users/${userId}`).then(() => {
    //   // Refresh the adminData after user removal
    // });
    console.log(oldDoctor);
    const response = await fetch("http://localhost:4000/api/doctor", {
      method: "DELETE",
      body: JSON.stringify(oldDoctor),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      alert(json.error);
    }
    if (response.ok) {
      alert("Doctor Deleted Successfully");
    }
  };
  const handleRemovePatient = async (e) => {
    e.preventDefault();
    // Send a request to remove the user with the given userId
    // Example: axios.delete(`/api/users/${userId}`).then(() => {
    //   // Refresh the adminData after user removal
    // });
    const response = await fetch("http://localhost:4000/api/patient", {
      method: "DELETE",
      body: JSON.stringify(oldPatient),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      alert(json.error);
    }
    if (response.ok) {
      alert("Patient Deleted Successfully");
    }
  };
  const handleAcceptDoctor = async (e) => {
    e.preventDefault();

    // Assuming that the backend API endpoint for updating the doctor status is "/api/doctor/approve"
    const response = await fetch("http://localhost:4000/api/doctor", {
      method: "PATCH", // Use PUT method for updating existing data
      body: JSON.stringify({ username: selectedUser.username, status: "approved" }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      alert(json.error);
    } else {
      // Update the user list and reset selectedUser state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.username === selectedUser.username
            ? { ...user, status: "approved" }
            : user
        )
      );
      setSelectedUser(null);
      alert("Doctor Approved Successfully");
    }
  };

  return (
    <div>
      <h1 className="title">Admin Panel</h1>
        <LogoutButton/>
      {/* Add Admin Form */}
      <div className="form-container">
        <h3>
          Add Admin
        </h3>
        <input
          type="text"
          placeholder="Username"
          value={newAdmin.username}
          onChange={(e) =>
            setNewAdmin({ ...newAdmin, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={newAdmin.password}
          onChange={(e) =>
            setNewAdmin({ ...newAdmin, password: e.target.value })
          }
        />
        <button className="button" onClick={handleAddAdmin}>Add Admin</button>
      </div>

      <div className="form-container">
        <h3>
          Remove Admin
        </h3>
        <input
          type="text"
          placeholder="Username"
          value={oldAdmin.username}
          onChange={(e) =>
            deleteAdmin({ ...oldAdmin, username: e.target.value })
          }
        />
        <button className="button" onClick={handleRemoveAdmin}>Delete Admin</button>
      </div>
      <div className="form-container">
      <h3>
          Remove Doctor
        </h3>
        <input
          type="text"
          placeholder="Username"
          value={oldDoctor.username}
          onChange={(e) =>
            deleteDoctor({ ...oldDoctor, username: e.target.value })
          }
        />
        <button className="button" onClick={handleRemoveDoctor}>Delete doctor</button>
      </div>
      <div className="form-container">
      <h3>Remove Patient</h3>
        <input
          type="text"
          placeholder="Username"
          value={oldPatient.username}
          onChange={(e) =>
            deletePatient({ ...oldPatient, username: e.target.value })
          }
        />
        <button className="button" onClick={handleRemovePatient}>Delete patient</button>
      </div>
      <ChangePasswordForm/>
      <Link to="/admin/packages" className="button">
            Packages
          </Link>



      {/* User List */}
      <div>
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
            <th>Status</th>
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
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="select-buttons">
          <button className="button-78" onClick={handleAcceptDoctor}>Accept Doctor</button>
          <button className= "button-78" onClick={handleRemoveDoctor}>Reject Doctor</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default AdminPanel;
