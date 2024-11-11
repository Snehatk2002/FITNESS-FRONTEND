import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        // Fetch all feedbacks on component mount
        axios.get('http://localhost:8080/viewFeedbacks')
            .then(response => {
                setFeedbacks(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching feedbacks:', error);
            });
    }, []);

    // Function to handle deleting feedback
    const handleDelete = (feedbackId) => {
        axios.delete(`http://localhost:8080/deleteFeedback/${feedbackId}`)
            .then(response => {
                alert(response.data.message);
                // Remove deleted feedback from the state
                setFeedbacks(feedbacks.filter(feedback => feedback.feedbackId !== feedbackId));
            })
            .catch(error => {
                console.error('Error deleting feedback:', error);
            });
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

    const headingStyle = {
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
        textAlign: 'center',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
    };

    const thStyle = {
        padding: '12px',
        textAlign: 'left',
        backgroundColor: '#007bff',
        color: '#fff',
        fontWeight: 'bold',
    };

    const tdStyle = {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    };

    const evenRowStyle = {
        backgroundColor: '#f2f2f2',
    };

    const hoverRowStyle = {
        backgroundColor: '#e1e1e1',
    };

    const noFeedbackStyle = {
        textAlign: 'center',
        color: '#777',
        fontStyle: 'italic',
        fontSize: '16px',
    };

    return (
        <div>
            <AdminNavbar />
            <div style={containerStyle}>
                <h2 style={headingStyle}>Feedback Management</h2>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Feedback ID</th>
                            <th style={thStyle}>EMAIL</th>
                            <th style={thStyle}>Message</th>
                            <th style={thStyle}>Submitted Date</th>
                            <th style={thStyle}>Action</th> {/* New column for delete action */}
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.length > 0 ? (
                            feedbacks.map((feedback, index) => (
                                <tr
                                    key={feedback.feedbackId}
                                    style={index % 2 === 0 ? evenRowStyle : {}}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverRowStyle.backgroundColor}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                                >
                                    <td style={tdStyle}>{feedback.feedbackId}</td>
                                    <td style={tdStyle}>{feedback.email}</td>
                                    <td style={tdStyle}>{feedback.message}</td>
                                    <td style={tdStyle}>{new Date(feedback.submittedDate).toLocaleDateString()}</td>
                                    <td style={tdStyle}>
                                        <button
                                            style={{
                                                backgroundColor: '#dc3545',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '5px 10px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleDelete(feedback.feedbackId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={noFeedbackStyle}>No feedbacks available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminFeedback;
