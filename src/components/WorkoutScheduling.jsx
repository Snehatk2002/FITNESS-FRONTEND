import axios from 'axios';
import React, { useState } from 'react';
import Navbar from './Navbar';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const WorkoutScheduling = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        workoutType: "",
        membershipType: "",
        trainerName: "",
        traineremail: "",
        date: "",
        time: "",
    });

    const [paymentStatus, setPaymentStatus] = useState(false); // Track payment completion
    const [selectedPayment, setSelectedPayment] = useState(null); // Track selected payment method

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        // Validate form data
        if (!data.name || !data.email || !data.workoutType || !data.membershipType || 
            !data.trainerName || !data.traineremail || !data.date || !data.time) {
            alert("Please fill in all fields.");
            return; 
            // Prevent submission if fields are missing
        }

        if (data.membershipType === "Others" && !paymentStatus) {
            alert("Please complete the payment before booking.");
            return; // Block booking until payment is done
        }

        // Proceed with booking
        axios.post("http://localhost:8080/WorkoutSchedule", data)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    alert("SUCCESSFULLY BOOKED");
                } else if (response.data.status === "error" && response.data.message === "Trainer already booked for this time slot") {
                    alert("This trainer is already booked for the selected time slot. Please choose a different time or trainer.");
                } else {
                    alert("ERROR: " + response.data.message); // Display the error message from the server
                }
            })
            .catch(error => {
                console.error("Error during booking:", error.response ? error.response.data : error.message);
                alert("An error occurred: " + (error.response ? error.response.data.message : error.message));
            });
    };

    const handlePaymentSelect = (paymentMethod) => {
        setSelectedPayment(paymentMethod);
    };

    const handlePaymentSuccess = () => {
        setPaymentStatus(true); // Payment is successful
        alert("Payment completed successfully. You can now book your workout.");
    };

    const navigate = useNavigate();
    const deleteSchedule = () => {
        sessionStorage.clear();
        navigate("/deleteSchedule");
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm p-4">
                            <center><h2 className="card-title mb-4">WORKOUT SCHEDULING</h2></center>
                            <div className="row g-3">
                                <div className="col-12 col-sm-6">
                                    <label className="form-label">NAME</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={data.name}
                                        onChange={inputHandler}
                                    />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <label className="form-label">EMAIL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={data.email}
                                        onChange={inputHandler}
                                    />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <label className="form-label">WORKOUT TYPE</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="workoutType"
                                        value={data.workoutType}
                                        onChange={inputHandler}
                                    />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <label className="form-label">MEMBERSHIP TYPE</label>
                                    <select
                                        className="form-select"
                                        name="membershipType"
                                        value={data.membershipType}
                                        onChange={inputHandler}
                                    >
                                        <option value="">Select Membership Type</option>
                                        <option value="Gold">Gold</option>
                                        <option value="Silver">Silver</option>
                                        <option value="Platinum">Platinum</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <label className="form-label">TRAINER NAME</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="trainerName"
                                        value={data.trainerName}
                                        onChange={inputHandler}
                                    />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <label className="form-label">TRAINER EMAIL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="traineremail"
                                        value={data.traineremail}
                                        onChange={inputHandler}
                                    />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <label className="form-label">DATE (YYYY-MM-DD)</label>
                                    <input
                                        type="text" // Changed to text type
                                        className="form-control"
                                        name="date"
                                        value={data.date}
                                        onChange={inputHandler}
                                    />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <label className="form-label">TIME (HH:MM)</label>
                                    <input
                                        type="text" // Changed to text type
                                        className="form-control"
                                        name="time"
                                        value={data.time}
                                        onChange={inputHandler}
                                    />
                                </div>

                                <center>
                                    {data.membershipType === "Others" && (
                                        <>
                                            <p style={{ color: 'red' }}>
                                                Note: You don't have any membership plan. You can book only after completing the payment.
                                            </p>
                                            <button className="btn btn-warning" onClick={() => handlePaymentSelect('GPay')}>Pay with GPay</button>
                                            <button className="btn btn-warning ms-3" onClick={() => handlePaymentSelect('PhonePe')}>Pay with PhonePe</button>
                                        </>
                                    )}

                                    {selectedPayment && (
                                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                            <h3>Scan QR Code for {selectedPayment}</h3>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <QRCodeCanvas value={`Payment for ${data.membershipType} membership via ${selectedPayment}`} size={200} />
                                            </div>
                                            <button className="btn btn-success mt-3" onClick={handlePaymentSuccess}>
                                                Simulate {selectedPayment} Payment Success
                                            </button>
                                        </div>
                                    )}

                                    <div className="col-12 mt-4">
                                        <button className="btn btn-primary" onClick={readValue} disabled={data.membershipType === "Others" && !paymentStatus}>
                                            BOOK
                                        </button>
                                        <button className="btn btn-danger ms-3" onClick={deleteSchedule}>CANCEL</button>
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

export default WorkoutScheduling;
