import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function LinkFamily() {
    const [formData, setFormData] = useState({
        role: '',
        email: '',
        number: '',
      });
      
      const [error, setError] = useState('');
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Make a request to the server for authentication
          console.log(formData);
          const response = await fetch("http://localhost:4000/api/patient/link", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            withCredentials: true,
            credentials : `include`
          });
    
          const data = await response.json();
          if (response.ok) {
            // Reset error state on successful login
            setError('');
            // Redirect or handle response as needed
          } else {
            // Display error message
            setError(data.error || 'An error occurred');
          }
          console.log(data);
    
          // Redirect or handle response as needed
        } catch (error) {
          console.error('Error during login:', error);
        }
      };
    
      return (
        <div>
          <h2>Link Family Members</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              Role:
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="wife">wife</option>
                <option value="husband">husband</option>
                <option value="child">children</option>
              </select>
            </label>
            <br />
            <label>
              Phone Number:
              <input
                type="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <button className='button-78' type="submit">Link</button>
      </form>
        </div>
            );
    };