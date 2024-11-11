import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Feedback = () => {
    const [formData, setFormData] = useState({
        email: '',
        message: ''
    });

    // Use useEffect to automatically fill the email field from sessionStorage
    useEffect(() => {
        const userEmail = sessionStorage.getItem('userEmail');
        if (userEmail) {
            setFormData((prevData) => ({ ...prevData, email: userEmail }));
        }
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/submitFeedback', formData)
            .then(response => {
                alert('Feedback submitted successfully!');
                setFormData({ email: '', message: '' });
            })
            .catch(error => {
                console.error('Error submitting feedback:', error);
            });
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(".jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
    };

    const formStyle = {
        maxWidth: '600px',
        width: '100%',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
    };

    const formGroupStyle = {
        marginBottom: '15px',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    const textareaStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        minHeight: '100px',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    };

    return (
        <div>
            <Navbar />
            <div style={containerStyle}>
                <div style={formStyle}>
                    <center><h2>Submit Feedback</h2></center>
                    <form onSubmit={handleSubmit}>
                        <div style={formGroupStyle}>
                            <label style={labelStyle}>EMAIL:</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                style={inputStyle}
                                required
                                disabled // Disable the input as the email is pre-filled
                            />
                        </div>
                        <div style={formGroupStyle}>
                            <label style={labelStyle}>Feedback Message:</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                style={textareaStyle}
                                required
                            ></textarea>
                           
                        </div>
                        <center>
                        <button type="submit" style={buttonStyle}>Submit Feedback</button>
                        </center>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
