import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const LogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const styles = {
    navbar: {
      background: 'linear-gradient(90deg, #007bff, #6610f2)',
      color: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    brand: {
      fontSize: '1.5rem',
      color: '#fff',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    navLink: {
      fontSize: '1.1rem',
      color: 'white',
      transition: 'color 0.3s ease-in-out',
    },
    navLinkHover: {
      color: '#f8f9fa',
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
    },
    profileImg: {
      height: '40px',
      borderRadius: '50%',
      border: '2px solid #fff',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out',
    },
    profileImgHover: {
      transform: 'scale(1.1)',
    },
    dropdownMenu: {
      backgroundColor: '#f1f1f1',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }
  };

  return (
    <nav className="navbar navbar-expand-lg" style={styles.navbar}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/" style={styles.brand}>
          <b>Ultimate Fit Zone</b>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a 
                className="nav-link active" 
                aria-current="page" 
                href="/home" 
                style={styles.navLink}
                onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color}
                onMouseOut={(e) => e.target.style.color = styles.navLink.color}
              >
                HOME
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="/workout" 
                style={styles.navLink}
                onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color}
                onMouseOut={(e) => e.target.style.color = styles.navLink.color}
              >
                WORKOUT SCHEDULING
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="/bmi" 
                style={styles.navLink}
                onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color}
                onMouseOut={(e) => e.target.style.color = styles.navLink.color}
              >
                BMI CALCULATOR
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="/feedback" 
                style={styles.navLink}
                onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color}
                onMouseOut={(e) => e.target.style.color = styles.navLink.color}
              >
                FEEDBACK & REVIEWS
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="/about" 
                style={styles.navLink}
                onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color}
                onMouseOut={(e) => e.target.style.color = styles.navLink.color}
              >
                ABOUT
              </a>
            </li>
          </ul>
          <div className="d-flex align-items-center ms-auto">
            <div className="dropdown">
              <img 
                src="profile.jpg" 
                alt="Profile" 
                style={styles.profileImg} 
                className="dropdown-toggle" 
                id="dropdownMenuButton" 
                aria-expanded="false" 
                data-bs-toggle="dropdown"
                onMouseOver={(e) => e.target.style.transform = styles.profileImgHover.transform}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              />
              <ul className="dropdown-menu dropdown-menu-end" style={styles.dropdownMenu} aria-labelledby="dropdownMenuButton">
                <li><a className="dropdown-item" href="/getProfile">VIEW PROFILE</a></li>
                <li><a className="dropdown-item" href="/getdietplan">GET DIET PLAN</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#" onClick={LogOut}>LOG OUT</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
