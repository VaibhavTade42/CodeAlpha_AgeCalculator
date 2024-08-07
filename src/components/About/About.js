import React from 'react';
import { Link } from 'react-router-dom';
import './styles/About.css'; // Custom CSS for additional styling

const About = () => {
    return (
        <div className="container mt-5">
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">CodeAlpha</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="text-center">
                <h1 className="display-4">About CodeAlpha</h1>
                <p className="lead">Learn more about our features</p>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">Age Calculator Feature</h2>
                            <p className="card-text">The Age Calculator allows users to input their birthdate and calculate their age.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">Weather Forecast Feature</h2>
                            <p className="card-text">The Weather Forecast provides current and future weather information based on the user's location.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4">
                <Link to="/" className="btn btn-primary btn-lg">Go to Home</Link>
            </div>
        </div>
    );
};

export default About;
