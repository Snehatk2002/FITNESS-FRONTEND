import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const ViewTrainers = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    // Fetch all trainers initially
    const fetchData = () => {
        axios.post("http://localhost:8080/ViewTrainers")
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                setFilteredData(response.data); // Show all trainers initially
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    // Handle search action
    const handleSearch = () => {
        // Filter the data based on the search query
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredData(filtered);
    };

    useEffect(() => {
        fetchData(); // Fetch data on component mount
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <h1 className="mb-4">TRAINERS LIST</h1>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-12 col-md-8 offset-md-2">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row centered-table">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-8">
                        {filteredData.length > 0 ? (
                            <table className="table table-striped table-hover table-bordered">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">TRAINER ID</th>
                                        <th scope="col">TRAINER NAME</th>
                                        <th scope="col">EMAIL</th>
                                        <th scope="col">PHONE NO</th>
                                        <th scope="col">SPECIALIZATION</th>
                                        <th scope="col">EXPERIENCE</th>
                                        <th scope="col">CERTIFICATIONS</th>
                                        <th scope="col">AVAILABILITY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((value, index) => (
                                        <tr key={index}>
                                            <th scope="row">{value.id}</th>
                                            <td>{value.name}</td>
                                            <td>{value.email}</td>
                                            <td>{value.phoneno}</td>
                                            <td>{value.spec}</td>
                                            <td>{value.experience}</td>
                                            <td>{value.certification}</td>
                                            <td>{value.aval}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center">No trainers found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewTrainers;
