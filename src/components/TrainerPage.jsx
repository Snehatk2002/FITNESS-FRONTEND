import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrainerPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchDate, setSearchDate] = useState('');
    const trainerEmail = sessionStorage.getItem('userEmail'); // Get logged-in trainer's email
    const navigate = useNavigate();

    const fetchTrainerBookings = () => {
        setLoading(true); // Start loading
        axios.post("http://localhost:8080/getTrainerBookings", { trainerEmail })
            .then(response => {
                setBookings(response.data);
                setFilteredBookings(response.data); // Initialize filtered bookings
                setLoading(false);
            })
            .catch(err => {
                setError("Error fetching trainer bookings. Please try again.");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTrainerBookings();
    }, []);

    const logOut = () => {
        sessionStorage.removeItem('userEmail'); // Clear the session storage
        navigate('/'); // Redirect to login page
    };

    const handleSearch = () => {
        const filtered = bookings.filter(booking => 
            new Date(booking.date).toLocaleDateString() === new Date(searchDate).toLocaleDateString()
        );
        setFilteredBookings(filtered);
    };

    const clearSearch = () => {
        setFilteredBookings(bookings);
        setSearchDate('');
    };

    const handleDateChange = (e) => {
        setSearchDate(e.target.value);
    };

    return (
        <div className="trainer-page">
            <style>
                {`
                    .trainer-page {
                        background-color: #007bff; /* Blue background color for the entire page */
                        min-height: 100vh; /* Full height for the page */
                        padding: 20px; /* Padding around the page */
                    }

                    .container {
                        padding: 20px;
                        border-radius: 10px;
                        background-color: #ffffff; /* White background for the container */
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
                    }

                    h1 {
                        color: #343a40; /* Darker text color */
                        font-weight: bold;
                    }

                    .welcome-message {
                        font-size: 1.5rem;
                        font-weight: bold;
                        color: #007bff; /* Bootstrap primary color */
                        text-align: center;
                        margin-bottom: 20px; /* Space below welcome message */
                    }

                    .loader {
                        text-align: center;
                        font-size: 1.5rem;
                        color: #007bff;
                        margin-top: 20px; /* Spacing for the loader */
                    }

                    .alert {
                        margin-top: 20px; /* Spacing for alert */
                    }

                    .profile-icon {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        cursor: pointer;
                    }

                    .card {
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        padding: 15px;
                        margin: 10px;
                        background-color: #ffffff; /* White background for each card */
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        transition: transform 0.2s; /* Smooth scaling on hover */
                    }

                    .card:hover {
                        transform: scale(1.02); /* Scale up on hover */
                    }

                    .card-header {
                        font-weight: bold;
                        color: #007bff; /* Bootstrap primary color */
                        font-size: 1.25rem; /* Larger font size */
                    }

                    .card-body {
                        margin-top: 10px;
                    }

                    .card-row {
                        margin-bottom: 10px; /* Spacing between details */
                    }

                    .booking-container {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }

                    .filter-container {
                        margin-bottom: 20px; /* Spacing for filter section */
                    }

                    .small-blue-text {
                        font-size: 0.875rem; /* Smaller font size */
                        color: #007bff; /* Blue color */
                    }

                    @media (max-width: 768px) {
                        .booking-container {
                            flex-direction: column;
                        }
                    }
                `}
            </style>

            <div className="container my-5">
                {/* Header with Profile Dropdown */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    {/* Profile Dropdown */}
                    <div className="dropdown ms-auto">
                        <img 
                            src="profile.jpg" 
                            alt="Profile" 
                            className="profile-icon dropdown-toggle" 
                            id="dropdownMenuButton" 
                            aria-expanded="false" 
                            data-bs-toggle="dropdown"
                        />
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="/gettrainerprofile">VIEW PROFILE</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="/" onClick={logOut}>LOG OUT</a></li>
                        </ul>
                    </div>
                </div>

                <h1 className="welcome-message">Welcome to Ultimate Fit Zone!</h1> {/* Welcome message */}

                {/* Logo Image */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <img src="fit.png" alt="Logo" style={{ width: '300px', height: 'auto' }} />
                </div>
                <center>
                    <h1 className="mb-0" style={{ fontSize: '1.5rem', color: '#007bff' }}>Your Bookings</h1>
                </center>

                <br />

                {/* Search Filter for Date */}
                <div className="filter-container">
                    <input 
                        type="date" 
                        value={searchDate} 
                        onChange={handleDateChange} 
                        className="form-control mb-3" 
                        placeholder="Search by date"
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    <button className="btn btn-secondary ms-2" onClick={clearSearch}>Clear</button>
                </div>

                {loading ? (
                    <div className="loader">Loading...</div>
                ) : error ? (
                    <div className="alert alert-danger" role="alert">{error}</div>
                ) : (
                    <div className="booking-container">
                        {filteredBookings.length === 0 ? (
                            <div className="alert alert-warning" role="alert">No bookings found.</div>
                        ) : (
                            filteredBookings.map((booking, index) => (
                                <div className="card" key={index} style={{ width: '30%' }}>
                                    <div className="card-header">{booking.name}</div>
                                    <div className="card-body">
                                        <div className="card-row">
                                            <strong>Email:</strong> {booking.email}
                                        </div>
                                        <div className="card-row">
                                            <strong>Workout Type:</strong> {booking.workoutType}
                                        </div>
                                        <div className="card-row">
                                            <strong>Membership Type:</strong> {booking.membershipType}
                                        </div>
                                        <div className="card-row">
                                            <strong>Date:</strong> {booking.date}
                                        </div>
                                        <div className="card-row">
                                            <strong>Time:</strong> {booking.time}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrainerPage;
