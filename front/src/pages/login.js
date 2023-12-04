import React, { useState, useContext } from 'react';
import {  useNavigate, Link} from 'react-router-dom';
import '../styles/doctor.css'
import UsernameContext from './UsernameContext';
import RoleContext from './RoleContext';

const Login = () => {
  const navigate  = useNavigate();
  const {setUsername} = useContext(UsernameContext);
  const { setRole } = useContext(RoleContext);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        withCredentials: true,
        credentials: `include`
      });
  
      const data = await response.json();

      console.log('Response Data:', data);

      if (response.ok) {
        // Reset error state on successful login
        setError('');
        // Destructure username and role from data
        const { username, role, status} = data;
        
        if (role === "doctor" && status === "pending") {
          setError("Your account is still pending approval. Please wait for approval.");
        } else {
          // Set username and role in the context
          setUsername(username);
          setRole(role);
          // Redirect or handle response as needed
          navigate("/" + role + "/home");
        }
      } else {
        // Display error message
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className='button-78' type="submit">Login</button>
        <br />
        <Link to="/forgotPassword">Forgot Password?</Link>
      </form>
    </div>
  );
};

export default Login;
