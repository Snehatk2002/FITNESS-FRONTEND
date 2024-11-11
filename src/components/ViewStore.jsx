import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ViewStore = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

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

    const handleBuyNow = (item) => {
        // Navigate to StorePayment page and pass the item name and price
        navigate('/storepayment', { state: { itemName: item.name, itemPrice: item.price } });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={styles.container}>
            <Navbar />
            <h2 style={styles.title}>VIEW ACCESSORIES</h2>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    style={styles.searchInput}
                    placeholder="Search by name or category"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button
                    style={styles.searchButton}
                    type="button"
                >
                    Search
                </button>
            </div>
            <div style={styles.cardContainer}>
                {filteredData.length === 0 ? (
                    <p>No accessories available.</p>
                ) : (
                    filteredData.map((item) => (
                        <div key={item._id} style={styles.card}>
                            <img src={item.image} style={styles.cardImage} alt={item.name} />
                            <div style={styles.cardBody}>
                                <h5 style={styles.cardTitle}>{item.name}</h5>
                                <p style={styles.cardText}>
                                    <strong>Category:</strong> {item.category}<br />
                                    <strong>Price:</strong> ${item.price}<br />
                                    <strong>Stock:</strong> {item.stock}
                                </p>
                                <button
                                    style={styles.buyButton} // Updated style for Buy Now button
                                    onClick={() => handleBuyNow(item)} // Call handleBuyNow with item data
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    searchInput: {
        padding: '10px',
        width: '300px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginRight: '10px',
    },
    searchButton: {
        padding: '10px 15px',
        backgroundColor: '#007bff', // Search button color
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        width: '24%', // Fixed width for uniformity
        margin: '10px 0',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
    },
    cardImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    cardBody: {
        padding: '15px',
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'column',
    },
    cardTitle: {
        margin: '0 0 10px',
        fontSize: '1.2em',
    },
    cardText: {
        flexGrow: '1',
    },
    buyButton: {
        padding: '10px',
        backgroundColor: '#007bff', // Change this to blue for the Buy Now button
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
};

// CSS for full-width navbar
const navbarStyles = {
    width: '100%',
    position: 'fixed',
    top: 0,
    zIndex: 1000,
};

export default ViewStore;
