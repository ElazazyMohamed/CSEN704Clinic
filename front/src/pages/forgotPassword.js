import React, { useState } from 'react';
import {  useNavigate, Link} from 'react-router-dom';
import '../styles/doctor.css'

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:4000/api/user/forgotPassword", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
            }),
            withCredentials: true,
            credentials : `include`
            });
    
            const data = await response.json();
            if (response.ok) {
            // Move to the next reset step
                setError('');
            // Navigate to OtpVerification page with formData.role
                navigate("/resetPassword");
            } else {
                setError(data.error || 'An error occurred during password reset');
            }
          // Redirect or handle response as needed
        } catch (error) {
          console.error('Error Reseting Password:', error);
        }
    };
    
    return (
        <div>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>  
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Enter your email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <button className='button-78' type="submit">
                Send OTP
            </button>
        </form>
        <br />
        <Link to="/login">Back to Login</Link>
        </div>
    );
};

export default ForgotPassword;
