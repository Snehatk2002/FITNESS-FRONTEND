import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';

const AdminMachineManagement = () => {
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

    const handleDelete = (machineId) => {
        axios.delete(`http://localhost:8080/deleteMachine/${machineId}`)
            .then((response) => {
                console.log(response.data.message);
                // Refresh the data after deletion
                fetchData();
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        fetchData(); // Fetch data on component mount
    }, []);

    return (
        <div>
            <AdminNavbar />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <h1 className="mb-4">MACHINES LIST</h1>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-12 col-md-8 offset-md-2">
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
                        <div className="table-responsive"> {/* Responsive wrapper for the table */}
                            <table className="table table-striped table-hover table-bordered text-center">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">MACHINE ID</th>
                                        <th scope="col">MACHINE NAME</th>
                                        <th scope="col">TYPE</th>
                                        <th scope="col">USAGE HOUR</th>
                                        <th scope="col">MAINTENANCE STATUS</th>
                                        <th scope="col">LAST MAINTENANCE DATE</th>
                                        <th scope="col">ACTION</th>
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
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(value.machineid)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">No machines found.</td>
                                        </tr>
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

export default AdminMachineManagement;
