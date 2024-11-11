import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const Adminlogin = () => {
        sessionStorage.clear();
        navigate("/Adminlogin");
    }

    const [data, setData] = useState({
        email: "",
        password: "",
        role: ""
    });

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const readValue = () => {
        console.log(data);
        axios.post("http://localhost:8080/userSignIn", data)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    // Store email in session storage
                    sessionStorage.setItem('userEmail', data.email);
                    alert("Successfully logged in");

                    // Navigate based on user role
                    if (data.role === "user") {
                        navigate("/home");
                    } else if (data.role === "trainer") {
                        navigate("/trainerpage");
                    } else {
                        alert("Invalid role selected");
                    }
                } else {
                    alert("Login failed");
                }
            })
            .catch((error) => {
                console.error("There was an error logging in!", error);
                alert("There was an error logging in!");
            });
    }

    return (
        <div className="login-page">
            <div className="container">
                {/* Banner Section */}
                <div style={styles.banner}>
                    <h1 style={styles.bannerText}>ULTIMATE FIT ZONE</h1>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                        <div style={styles.card}>
                            <h2 className="text-center mb-4" style={styles.heading}>Welcome Back!</h2>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label" style={styles.label}>Email</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={data.email}
                                            onChange={inputHandler}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="password" className="form-label" style={styles.label}>Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={data.password}
                                            onChange={inputHandler}
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label} htmlFor="role">Role</label>
                                    <select
                                        style={styles.select}
                                        name="role"
                                        value={data.role}
                                        onChange={inputHandler}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="user">User</option>
                                        <option value="trainer">Trainer</option>
                                    </select>
                                </div>
                                <div className="col-12 text-center">
                                    <button className="btn btn-primary w-100" onClick={readValue}>LOGIN</button>
                                </div>
                                <div className="col-12 text-center">
                                    <Link className="nav-link" to="/signup" style={styles.signUpLink}>Create A New Account</Link>
                                </div>
                                <div className="col-12 text-center">
                                    <button className="btn btn-primary mt-3" onClick={Adminlogin} style={styles.adminLoginButton}>Admin Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    banner: {
        backgroundColor: '#1E90FF',
        padding: '15px 0',
        textAlign: 'center',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    bannerText: {
        color: '#fff',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        margin: '0',
    },
    card: {
        backgroundColor: 'transparent',
        border: '2px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontWeight: 'bold',
        color: '#fff',
    },
    label: {
        fontWeight: 'bold',
        color: '#fff',
    },
    select: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    signUpLink: {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    adminLoginButton: {
        fontWeight: 'bold',
    },
};

export default Login;
