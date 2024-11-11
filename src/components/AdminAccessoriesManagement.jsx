import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

// Define CSS styles as a JavaScript object
const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        marginBottom: '2rem',
        textAlign: 'center',
    },
    searchInput: {
        marginBottom: '1rem',
    },
    card: {
        transition: 'transform 0.2s', // Smooth transform
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // Light shadow
        height: '100%', // Make sure all cards are the same height
    },
    cardImage: {
        height: '200px', // Fixed height for images
        objectFit: 'cover', // Cover to maintain aspect ratio
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Space between elements
        height: '100%', // Ensures buttons stay at the bottom
    },
    buyButton: {
        marginRight: '0.5rem',
    },
};

const AdminAccessriesManagement = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/ViewAccessories");
            setData(response.data);
            setFilteredData(response.data); // Initialize filtered data
        } catch (error) {
            setError("Failed to load accessories");
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Filter data based on search query
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = async (name) => {
        try {
            await axios.delete(`http://localhost:8080/deleteAccessory/${name}`);
            // Remove the deleted item from state
            setData(data.filter(item => item.name !== name));
            setFilteredData(filteredData.filter(item => item.name !== name));
        } catch (error) {
            console.error("Error deleting accessory:", error);
            alert("Failed to delete accessory");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <AdminNavbar />
            <div className="container" style={styles.container}>
                <h2 style={styles.header}>VIEW ACCESSORIES</h2>
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="input-group" style={styles.searchInput}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name or category"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button className="btn btn-primary" type="button">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {filteredData.length === 0 ? (
                        <div className="col-12">
                            <p>No accessories available.</p>
                        </div>
                    ) : (
                        filteredData.map((item) => (
                            <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch">
                                <div className="card" style={styles.card}>
                                    <img src={item.image} className="card-img-top" alt={item.name} style={styles.cardImage} />
                                    <div className="card-body" style={styles.cardBody}>
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">
                                            <strong>Category:</strong> {item.category}<br />
                                            <strong>Price:</strong> ${item.price}<br />
                                            <strong>Stock:</strong> {item.stock}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <a href="#" className="btn btn-primary" style={styles.buyButton}>Buy Now</a>
                                            <button
                                                className="btn btn-danger ms-2"
                                                onClick={() => handleDelete(item.name)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminAccessriesManagement;
