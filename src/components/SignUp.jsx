import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        profilePicture: '',
        name: '',
        email: '',
        address: '',
        phoneno: '',
        gender: '',
        age: '',
        weight: '',
        height: '',
        membershipType: '',
        membershipStartDate: '',
        fitnessGoal: '',
        password: '',
        confirm: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleMembershipFocus = () => {
        navigate('/package', { state: { ...formData } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!formData.name || !formData.email || formData.password !== formData.confirm) {
            setError('Please fill in all required fields and make sure passwords match.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/userSignUp', formData);
            if (response.data.status === 'success') {
                setSuccess('Registration successful!');
                window.alert('Registration successful!');
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('userid', response.data.userid);
                navigate('/');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Error during registration:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.background}>
            <div className="container">
                <div className="register-page" style={styles.page}>
                    <h2 style={styles.heading}>Create Your Profile</h2>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <img src="zone.png" alt="Logo" style={{ width: '300px', height: 'auto' }} />
                    </div>
                    <Link to="/package" style={styles.link}>
                        Choose a Membership Plan
                    </Link>
                    <form onSubmit={handleSubmit}>
                        {Object.keys(formData).map((key, index) => {
                            if (key === "gender" || key === "membershipType") {
                                return (
                                    <div className="form-group" key={index}>
                                        <label style={styles.label}>
                                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                        </label>
                                        <select
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleChange}
                                            className="form-control"
                                            required={key === "membershipType"}
                                        >
                                            <option value="" disabled>Select {key.charAt(0).toUpperCase() + key.slice(1)}</option>
                                            {key === "gender" && (
                                                <>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </>
                                            )}
                                            {key === "membershipType" && (
                                                <>
                                                    <option value="Gold">Gold</option>
                                                    <option value="Silver">Silver</option>
                                                    <option value="Platinum">Platinum</option>
                                                    <option value="Others">Others</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                );
                            }
                            return (
                                <div className="form-group" key={index}>
                                    <label style={styles.label}>
                                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                    </label>
                                    <input
                                        type={
                                            key === "password" || key === "confirm"
                                                ? "password"
                                                : key === "membershipStartDate"
                                                ? "date"
                                                : "text"
                                        }
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        className="form-control"
                                        required={key === "name" || key === "email" || key === "password" || key === "confirm"}
                                        autoComplete={key === "email" ? "email" : key === "password" ? "new-password" : undefined}
                                    />
                                </div>
                            );
                        })}
                        <br />
                        <div className="text-center">
                            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                        {error && <p style={styles.error}>{error}</p>}
                        {success && <p style={styles.success}>{success}</p>}
                        <div className="text-center">
                            <Link className="nav-link mt-3" to="/" style={styles.loginLink}>
                                Already have an account? Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    background: {
        backgroundImage: 'url("https://tse3.mm.bing.net/th?id=OIP.0UcinFW6ckB4BszMgUWetgHaEK&pid=Api&P=0&h=180.jpg")', // Change this to the path of your background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    page: {
        maxWidth: '700px',
        width: '100%',
        margin: 'auto',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        border: '3px solid #1E90FF',
    },
    heading: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    link: {
        display: 'block',
        marginBottom: '15px',
        color: '#007bff',
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
    success: {
        color: 'green',
        marginTop: '10px',
    },
    loginLink: {
        color: '#007bff',
        textAlign: 'center',
    },
};

export default SignUp;
