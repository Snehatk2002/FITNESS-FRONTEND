import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const DeleteSchedule = () => {
    const [email, setEmail] = useState("");

    // Use useEffect to automatically fill the email field from sessionStorage
    useEffect(() => {
        const userEmail = sessionStorage.getItem('userEmail');
        if (userEmail) {
            setEmail(userEmail);
        }
    }, []);

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/WorkoutSchedule/${email}`)
            .then(response => {
                if (response.data.status === 'success') {
                    alert('Schedule deleted successfully');
                    setEmail(""); // Clear the input field
                } else {
                    alert('Error deleting schedule');
                }
            })
            .catch(error => {
                console.error(error);
                alert('An error occurred while deleting the schedule');
            });
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm p-4">
                            <center><h2 className="card-title mb-4">DELETE WORKOUT SCHEDULE</h2></center>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="scheduleId" className="form-label">EMAIL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                    />
                                </div>
                                <center>
                                    <div className="col-12 mt-4">
                                        <button className="btn btn-danger" onClick={handleDelete}>DELETE</button>
                                    </div>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteSchedule;
