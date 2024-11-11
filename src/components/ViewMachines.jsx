import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const ViewMachines = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = () => {
        axios.post("http://localhost:8080/ViewMachines")
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                setFilteredData(response.data); // Show all machines initially
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleSearch = () => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(lowercasedQuery) || 
            item.machineid.toLowerCase().includes(lowercasedQuery)
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
                <div className="row justify-content-center text-center">
                    <div className="col-12">
                        <h1 className="mb-4">MACHINES LIST</h1>
                    </div>
                </div>
                <div className="row mb-4 justify-content-center">
                    <div className="col-12 col-md-8">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by machine ID or name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-8">
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">MACHINE ID</th>
                                    <th scope="col">MACHINE NAME</th>
                                    <th scope="col">TYPE</th>
                                    <th scope="col">USAGE HOUR</th>
                                    <th scope="col">MAINTENANCE STATUS</th>
                                    <th scope="col">LAST MAINTENANCE DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((value, index) => (
                                        <tr key={index}>
                                            <th scope="row">{value.machineid}</th>
                                            <td>{value.name}</td>
                                            <td>{value.type}</td>
                                            <td>{value.usagehour}</td>
                                            <td>{value.maintenanceStatus}</td>
                                            <td>{value.lastMaintenanceDate}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No machines found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewMachines;
