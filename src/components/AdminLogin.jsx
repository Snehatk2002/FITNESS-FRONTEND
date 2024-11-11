import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        console.log(data);

        axios.post("http://localhost:8080/AdminLogin", data)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    alert("Successfully logged in as admin");
                    window.location.href = "/trainer";
                } else {
                    alert("Can't login. Please check your email or password.");
                }
            })
            .catch((error) => {
                console.error(error); // Handle errors
                alert("An error occurred during login.");
            });
    };

    return (
        <div className="admin-login-page" style={styles.page}>
            {/* Banner Section */}
            <div style={styles.banner}>
                <h1 style={styles.bannerText}>ULTIMATE FIT ZONE</h1>
            </div>
            {/* Card Section */}
            <div style={styles.card}>
                <h2 className="text-center mb-4" style={styles.heading}>Admin Login</h2>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label" style={styles.label}>Email Id</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        value={data.email} 
                        onChange={inputHandler} 
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password" className="form-label" style={styles.label}>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        name="password" 
                        value={data.password} 
                        onChange={inputHandler} 
                        placeholder="Enter your password"
                    />
                </div>
                <div className="text-center">
                    <button className="btn btn-primary btn-block" onClick={readValue}>LOGIN</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        height: '100vh', // Full viewport height
        backgroundColor: '#f8f9fa', // Light background color for contrast
    },
    card: {
        backgroundColor: 'transparent', // Transparent background
        border: '2px solid #ddd', // Border color
        borderRadius: '8px', // Rounded corners
        padding: '20px', // Padding inside the card
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
        marginTop: '20px', // Margin to separate card from banner
        width: '400px', // Fixed width for the card
    },
    banner: {
        backgroundColor: '#1E90FF',
        padding: '15px 0',
        textAlign: 'center',
        borderRadius: '8px',
        width: '100%', // Full width of the parent
    },
    bannerText: {
        color: '#fff',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        margin: '0',
    },
    heading: {
        fontWeight: 'bold', // Bold heading text
        color: '#ffffff', // White text color
        backgroundColor: '#1E90FF', // Grey background color
        padding: '10px', // Padding for the background
        borderRadius: '4px', // Rounded corners for the background
    },
    label: {
        fontWeight: 'bold', // Bold label text
        color: '#fff', // White text color
    },
};

export default AdminLogin;
