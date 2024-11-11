import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';

const ViewWorkout = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = () => {
        axios.post("http://localhost:8080/ViewWorkoutSchedule", {})
            .then(response => {
                setData(response.data);
                setFilteredData(response.data); // Initialize filtered data
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Filter data based on search query, focusing on workoutType and trainerName
        const filtered = data.filter(item =>
            (item.workoutType?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (item.trainerName?.toLowerCase() || '').includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <h1 className="mb-4">SCHEDULING DETAILS</h1>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by workout type or trainer name"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button
                                className="btn btn-primary"
                                type="button"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-8">
                        <div className="table-responsive"> {/* Responsive wrapper for the table */}
                            <table className="table table-striped table-hover table-bordered text-center">
                                <thead className="table-dark">
                                    <tr>
                                    <th scope="col">NAME</th>
                                        <th scope="col">EMAIL</th>
                                        <th scope="col">WORKOUT TYPE</th>
                                        <th scope="col">MEMBERSHIP TYPE</th>
                                        <th scope="col">TRAINER NAME</th>
                                        <th scope="col">TRAINER EMAIL</th>
                                        <th scope="col">DATE</th>
                                        <th scope="col">TIME</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">No records found.</td>
                                        </tr>
                                    ) : (
                                        filteredData.map((value, index) => (
                                            <tr key={index}>
                                                <td>{value.name}</td>
                                                <td>{value.email}</td>
                                                <td>{value.workoutType}</td>
                                                <td>{value.membershipType}</td>
                                                <td>{value.trainerName}</td>
                                                <td>{value.traineremail}</td>
                                                <td>{value.date}</td>
                                                <td>{value.time}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewWorkout;
