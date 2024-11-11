import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h1 style={headingStyle}>Welcome to Ultimate Fit Zone</h1>

            {/* Beautified Image Section */}
            <div style={imageContainerStyle} className="mb-5">
              <img src="fit.png" alt="Ultimate Fit Zone" style={imageStyle} />
            </div>

            <p style={descriptionStyle}>
              "Ultimate Fit Zone" is an innovative gym management platform designed to streamline fitness center operations and promote a healthy lifestyle. Key features include secure user authentication, personalized profiles, seamless trainer management, machine monitoring, a vibrant accessories store, flexible workout scheduling, and integrated feedback systems. It also offers customized diet plans based on user fitness goals, providing a tailored, health-focused experience for both members and administrators.
            </p>

            {/* Mission and Vision Section */}
            <div style={missionVisionContainerStyle}>
              <div style={missionVisionCardStyle}>
                <h2 style={missionVisionHeadingStyle}>Our Mission</h2>
                <p style={missionVisionTextStyle}>
                  Our mission is to empower individuals to achieve their fitness goals through innovative technology, personalized support, and a commitment to excellence. We strive to create a supportive and engaging environment that motivates users to lead healthier, more active lives.
                </p>
              </div>
              <div style={missionVisionCardStyle}>
                <h2 style={missionVisionHeadingStyle}>Our Vision</h2>
                <p style={missionVisionTextStyle}>
                  Our vision is to become the leading solution for gym management that fosters healthier lifestyles and encourages regular physical activity.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row g-4">
              <center>
                <h2 style={categoryHeadingStyle}>CORE FEATURES</h2>
              </center>
              <div className="row">
                {/* Trainer Profile Card */}
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="card h-100" style={cardStyle}>
                    <img
                      src="trainerprofile.jpg"
                      className="card-img-top"
                      alt="Trainer Profile"
                      style={imageStyle}
                    />
                    <div className="card-body">
                      <h5 className="card-title">Trainer Profile</h5>
                      <p className="card-text">
                        View detailed profiles of gym trainers, including their specializations, certifications, and assigned members.
                      </p>
                      <a href="/userTrainerprofile" className="btn btn-primary">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>

                {/* Accessories Store Card */}
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="card h-100" style={cardStyle}>
                    <img
                      src="store.jpg"
                      className="card-img-top"
                      alt="Accessories Store"
                      style={imageStyle}
                    />
                    <div className="card-body">
                      <h5 className="card-title">Accessories Store</h5>
                      <p className="card-text">
                        Browse a variety of workout accessories and nutrition products available for purchase.
                      </p>
                      <a href="/viewstore" className="btn btn-primary">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>

                {/* Machine Details Card */}
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="card h-100" style={cardStyle}>
                    <img
                      src="machine.jpg"
                      className="card-img-top"
                      alt="Machine Details"
                      style={imageStyle}
                    />
                    <div className="card-body">
                      <h5 className="card-title">Machine Details</h5>
                      <p className="card-text">
                        Get information about gym machines, including availability, type, usage hours, and maintenance dates.
                      </p>
                      <a href="/viewmachine" className="btn btn-primary">
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Section Heading and Description */}
              <div className="col-12 text-center mb-4">
                <h2 style={categoryHeadingStyle}>Fitness Management</h2>
                <p style={categoryDescriptionStyle}>
                  Enhance your fitness journey with streamlined scheduling for workouts, personalized diet plans, and accurate BMI calculations. Our integrated tools help you manage your fitness goals effectively, ensuring a healthier and more balanced lifestyle.
                </p>
              </div>

              {/* Workout Scheduling Card */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="card h-100" style={cardStyle}>
                  <img
                    src="workout.jpg"
                    className="card-img-top"
                    alt="Workout Scheduling"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Workout Scheduling</h5>
                    <p className="card-text">
                      Enables users to book sessions by selecting preferred dates and times, view workout scheduling, and cancel if needed, while admins manage sessions and trainer availability efficiently.
                    </p>
                  </div>
                </div>
              </div>

              {/* Diet Plan Card */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="card h-100" style={cardStyle}>
                  <img
                    src="DietPlan.jpg"
                    className="card-img-top"
                    alt="Diet Plan"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Diet Plan</h5>
                    <p className="card-text">
                      The system provides personalized diet plans based on users' fitness goals like weight loss, muscle gain, or overall health, with admin-managed meal recommendations.
                    </p>
                  </div>
                </div>
              </div>

              {/* BMI Calculator Card */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="card h-100" style={cardStyle}>
                  <img
                    src="bmi.jpg"
                    className="card-img-top"
                    alt="BMI Calculator"
                  />
                  <div className="card-body">
                    <h5 className="card-title">BMI Calculator</h5>
                    <p className="card-text">
                      The BMI Calculator offers a quick way for users to assess their body mass index by entering weight in kilograms and height in centimeters, providing immediate insights into their health status.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const headingStyle = {
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '20px',
  fontSize: '2.5rem', // Larger heading for emphasis
};

const imageContainerStyle = {
  maxWidth: '700px', // Increased width of image container
  margin: 'auto', // Center the image container
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Added shadow for a polished look
};

const imageStyle = {
  width: '60%', // Full-width image
  height: 'auto',
  transition: 'transform 0.3s ease', // Smooth transition for hover effect
  cursor: 'pointer', // Change cursor on hover
};

const descriptionStyle = {
  fontSize: '1.2rem',
  color: '#555',
  lineHeight: '1.8',
  marginTop: '20px',
};

const cardStyle = {
  border: 'none',
  borderRadius: '10px',
  overflow: 'hidden',
  transition: 'transform 0.3s ease', // Add hover scaling effect
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Added shadow for a modern look
};

const missionVisionContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '30px',
  gap: '20px',
};

const missionVisionCardStyle = {
  backgroundColor: '#1E90FF',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '48%',
  textAlign: 'center',
  color: '#FFF',
};

const missionVisionHeadingStyle = {
  fontSize: '1.8rem',
  marginBottom: '10px',
};

const missionVisionTextStyle = {
  fontSize: '1.1rem',
  lineHeight: '1.6',
};

const categoryHeadingStyle = {
  fontSize: '2rem',
  fontWeight: '600',
  color: '#000000', // Black color for the heading
  marginBottom: '20px',
};




const categoryDescriptionStyle = {
  fontSize: '1.2rem',
  color: '#777',
  lineHeight: '1.8',
};

export default Home;
