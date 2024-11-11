import axios from 'axios';
import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Link } from 'react-router-dom';

const AddTrainers = () => {
    const [data, setdata] = useState({
        id: "",
        name: "",
        email: "",
        phoneno: "",
        spec: "",
        experience: "",
        certification: "",
        aval: ""
    });

    const inputHandler = (event) => {
        setdata({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        console.log(data);
        axios.post("http://localhost:8080/addTrainers", data).then(
            (response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    alert("SUCCESSFULLY ADDED");
                } else {
                    alert("ERROR");
                }
            }
        ).catch((error) => {
            console.error(error);
            alert("An error occurred.");
        });
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm p-4">
                            <center><h2 className="card-title mb-4">TRAINERS DETAILS</h2></center>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label className="form-label">TRAINER ID</label>
                                    <input type="text" className="form-control" name="id" value={data.id} onChange={inputHandler} />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">TRAINER NAME</label>
                                    <input type="text" className="form-control" name="name" value={data.name} onChange={inputHandler} />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">EMAIL</label>
                                    <input type="text" className="form-control" name="email" value={data.email} onChange={inputHandler} />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">PHONE NO</label>
                                    <input type="text" className="form-control" name="phoneno" value={data.phoneno} onChange={inputHandler} />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">SPECIALIZATION</label>
                                    <input type="text" className="form-control" name="spec" value={data.spec} onChange={inputHandler} />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">EXPERIENCE</label>
                                    <input type="text" className="form-control" name="experience" value={data.experience} onChange={inputHandler} />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">CERTIFICATIONS</label>
                                    <input type="text" className="form-control" name="certification" value={data.certification} onChange={inputHandler} />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">AVAILABILITY</label>
                                    <input type="text" className="form-control" name="aval" value={data.aval} onChange={inputHandler} />
                                </div>
                                <center>
                                    <div className="col-12 mt-4">
                                        <button className="btn btn-primary" onClick={readValue}>ADD</button>
                                    </div>
                                    <div className="col-12 mt-2">
                                        <Link to="/adminviewTrainers" className="btn btn-primary">VIEW TRAINERS</Link>
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

export default AddTrainers;
