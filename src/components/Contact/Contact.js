import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Contact.css'; // Custom CSS for additional styling

const Contact = () => {
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
                <h1 className="display-4">Contact Us</h1>
                <p className="lead">We'd love to hear from you</p>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">CodeAlpha Age Calculator App</h2>
                            <p className="card-text"><strong>Email:</strong> contact@codealpha.com</p>
                            <p className="card-text"><strong>Contact Number:</strong> 123-456-7890</p>
                            <p className="card-text"><strong>Address:</strong> 123 CodeAlpha Lane, Dev City, DC 12345</p>
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

export default Contact;
