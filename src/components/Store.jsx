import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const Store = () => {
    const [data, setData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = async (event) => {
        event.preventDefault(); // Prevent form from submitting the default way
        if (!data.name || !data.category || !data.price || !data.stock || !data.image) {
            alert("All fields are required");
            return;
        }

        setLoading(true); // Start loading spinner or similar
        try {
            const response = await axios.post("http://localhost:8080/AddAccessories", data);
            if (response.data.status === "success") {
                alert("SUCCESSFULLY ADDED");
                setData({
                    name: '',
                    category: '',
                    price: '',
                    stock: '',
                    image: ''
                }); // Clear form fields
            } else {
                alert("ERROR");
            }
        } catch (error) {
            console.error("Error adding accessory:", error);
            alert("An error occurred");
        } finally {
            setLoading(false); // Stop loading spinner or similar
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm p-4">
                            <center><h2 className="card-title mb-4">Add New Accessories</h2></center>
                            <form onSubmit={readValue}>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={data.name}
                                            onChange={inputHandler}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">Category</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="category"
                                            value={data.category}
                                            onChange={inputHandler}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={data.price}
                                            onChange={inputHandler}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">Stock</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="stock"
                                            value={data.stock}
                                            onChange={inputHandler}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Image URL</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="image"
                                            value={data.image}
                                            onChange={inputHandler}
                                        />
                                    </div>
                                    <center>
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? "Adding..." : "ADD"}
                                        </button>
                                    </div>
                                    
                                    <div className="d-flex justify-content-end mb-4">
                                        <a href="/adminviewaccessories" className="btn btn-primary">VIEW ACCESSORIES</a>
                                    </div>
                                    </center>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Store;
