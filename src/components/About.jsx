import React from 'react';
import Navbar from './Navbar';

const About = () => {
  return (
    <div>
        <Navbar/>
    
    <div style={styles.container}>
      <br></br>
      <h1 style={styles.header}>About Ultimate Fit Zone</h1>
      
      <section style={styles.section}>
        <h2 style={styles.subHeader}>Welcome</h2>
        <p style={styles.paragraph}>
          Welcome to Ultimate Fit Zone! Our gym management system is designed to streamline gym operations, enhance user experience, and promote a healthier lifestyle. Whether you're a gym member or an administrator, our system offers comprehensive features to help you manage workouts, track progress, and stay motivated.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeader}>Key Features</h2>
        <ul style={styles.list}>
          <li>User Profiles</li>
          <li>Trainer Details</li>
          <li>Accessories Store</li>
          <li>Machine Details</li>
          <li>Workout Scheduling</li>
          <li>Feedback and Reviews</li>
          <li>BMI Calculator</li>
          <li>Diet Plan Based On Fitness Goal</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeader}>Our Mission</h2>
        <p style={styles.paragraph}>
        To empower individuals to achieve their fitness goals through innovative technology, personalized support, and a commitment to excellence. We strive to create a supportive and engaging environment that motivates users to lead healthier, more active lives.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeader}>Our Vision</h2>
        <p style={styles.paragraph}>
          To become the leading solution for gym management that fosters healthier lifestyles and encourages regular physical activity.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeader}>Contact Us</h2>
        <p style={styles.paragraph}>
          If you have any questions or need assistance, please reach out to our support team at <a href="mailto:support@gmail.com" style={styles.link}>support@gmail.com</a> or call us at <a href="tel:6282011259" style={styles.link}>628-201-1259</a>.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeader}>About Us</h2>
        <p style={styles.paragraph}>
          Ultimate Fit Zone is developed by a passionate team dedicated to improving fitness and wellness. Our team consists of experienced developers, fitness experts, and designers who work together to bring you the best gym management experience.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeader}>Our Facility</h2>
        <div style={styles.imageContainer}>
          <img src="f1.jpg" alt="Gym Facility" style={styles.image} />
          <img src="f2.jpg" alt="Gym Facility" style={styles.image} />
          <img src="f3.jpg" alt="Gym Facility" style={styles.image} />
        </div>
        <p style={styles.paragraph}>
          Our state-of-the-art facility offers a range of equipment and amenities to help you achieve your fitness goals.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeader}>Meet Our Team</h2>
        <img src="team.jpg" alt="Our Team" style={styles.teamImage} />
        <center>
        <p style={styles.paragraph}>
          Our dedicated team of professionals is here to support and guide you on your fitness journey.
        </p></center>
      </section>
    </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '900px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: '20px',
  },
  subHeader: {
    color: '#555',
    borderBottom: '2px solid #007bff',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  paragraph: {
    lineHeight: '1.6',
    color: '#666',
  },
  list: {
    paddingLeft: '20px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  linkHover: {
    textDecoration: 'underline',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '15px',
  },
  image: {
    flex: '1 1 calc(33.333% - 15px)', // Adjusts the width of each image
    maxWidth: 'calc(33.333% - 15px)', // Ensures images fit in one row with spacing
    height: 'auto',
    borderRadius: '8px',
  },
  teamImage: {
    width: '100%',
    maxWidth: '700px',
    height: 'auto',
    borderRadius: '8px',
    margin: '0 auto', // Centers the image horizontally
    display: 'block',
  },
};

export default About;
