import axios from 'axios';
import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';

const AddMachine = () => {
    const [data, setdata] = useState({
        machineid: "",
        name: "",
        type: "",
        usagehour: "",
        maintenanceStatus: "",
        lastMaintenanceDate: ""
    });

    const inputHandler = (event) => {
        setdata({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        console.log(data);
        axios.post("http://localhost:8080/AddMachines", data).then(
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
                            <center><h2 className="card-title mb-4">MACHINES DETAILS</h2></center>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label className="form-label">MACHINE ID</label>
                                    <input type="text" className="form-control" name="machineid" value={data.machineid} onChange={inputHandler} />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">MACHINE NAME</label>
                                    <input type="text" className="form-control" name="name" value={data.name} onChange={inputHandler} />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">TYPE</label>
                                    <input type="text" className="form-control" name="type" value={data.type} onChange={inputHandler} />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">USAGE HOUR</label>
                                    <input type="text" className="form-control" name="usagehour" value={data.usagehour} onChange={inputHandler} />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">MAINTENANCE STATUS</label>
                                    <input type="text" className="form-control" name="maintenanceStatus" value={data.maintenanceStatus} onChange={inputHandler} />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">LAST MAINTENANCE DATE</label>
                                    <input type="text" className="form-control" name="lastMaintenanceDate" value={data.lastMaintenanceDate} onChange={inputHandler} />
                                </div>
                                
                                <center>
                                    <div className="col-12 mt-4">
                                        <button className="btn btn-primary" onClick={readValue}>ADD</button>
                                    </div>
                                    <div className="col-12 mt-2">
                                        <a href="/adminviewmachines" className="btn btn-primary">VIEW MACHINES</a>
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

export default AddMachine;
