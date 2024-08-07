import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CurrentDate from '../CurrentDate/CurrentDate';
import './AgeCalculator.css';

const AgeCalculator = () => {
    const [birthDate, setBirthDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [age, setAge] = useState(null);
    const [errors, setErrors] = useState('');

    const navigate = useNavigate();
    const birthDatePickerRef = useRef();
    const selectedDatePickerRef = useRef();

    const calculateAge = (birthDate, selectedDate) => {
        const birth = new Date(birthDate);
        const selected = new Date(selectedDate);

        let years = selected.getFullYear() - birth.getFullYear();
        let months = selected.getMonth() - birth.getMonth();
        let days = selected.getDate() - birth.getDate();

        if (days < 0) {
            months -= 1;
            days += new Date(selected.getFullYear(), selected.getMonth(), 0).getDate();
        }

        if (months < 0) {
            years -= 1;
            months += 12;
        }

        return { years, months, days };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            const calculatedAge = calculateAge(birthDate, selectedDate);
            setAge(calculatedAge);
        }
    };

    const handleClear = () => {
        setBirthDate(null);
        setSelectedDate(new Date());
        setErrors('');
        setAge(null);
    };

    const handleTodayClick = () => {
        setSelectedDate(new Date());
    };

    const validateInputs = () => {
        if (!birthDate) {
            setErrors('Please select your date of birth.');
            return false;
        }
        if (!selectedDate) {
            setErrors('Please select the date up to which you want to calculate your age.');
            return false;
        }
        if (birthDate > selectedDate) {
            setErrors('Birth date cannot be after the selected date.');
            return false;
        }
        setErrors('');
        return true;
    };

    const handleLogout = () => {
        // clear user data, redirect to login page, etc.
        navigate('/login');
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#">CodeAlpha</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="age-calculator mt-4">
                <CurrentDate />
                <h1 className="text-center">Age Calculator</h1>
                <Form onSubmit={handleSubmit} className="text-center">
                    <Form.Group>
                        <Form.Label>Select Your Birth Date</Form.Label>
                        <div className="date-picker-container">
                            <DatePicker
                                selected={birthDate}
                                onChange={(date) => setBirthDate(date)}
                                dateFormat="dd/MM/yyyy"
                                maxDate={new Date()}
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={100}
                                className="form-control"
                                placeholderText="Select Birth Date"
                                ref={birthDatePickerRef}
                            />
                            <Button
                                className="date-picker-button"
                                onClick={() => birthDatePickerRef.current.setOpen(true)}
                            >
                                📅
                            </Button>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Select Date to Calculate Age Up To</Form.Label>
                        <div className="date-picker-container">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 100))}
                                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 100))}
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={100}
                                className="form-control"
                                placeholderText="Select Date"
                                ref={selectedDatePickerRef}
                            />
                            <Button
                                className="today-button"
                                onClick={handleTodayClick}
                            >
                                Today
                            </Button>
                            <Button
                                className="date-picker-button"
                                onClick={() => selectedDatePickerRef.current.setOpen(true)}
                            >
                                📅
                            </Button>
                        </div>
                    </Form.Group>
                    {errors && <p className="text-danger">{errors}</p>}
                    <Row className="justify-content-center">
                        <Col md="auto">
                            <Button type="submit" className="btn-primary">Calculate Age</Button>
                        </Col>
                        <Col md="auto">
                            <Button type="button" className="btn-secondary" onClick={handleClear}>Clear All Fields</Button>
                        </Col>
                    </Row>
                </Form>
                {age && (
                    <h2 className="text-center mt-3">
                        Your Age is: {age.years} years, {age.months} months, {age.days} days
                    </h2>
                )}
            </Container>
        </div>
    );
};

export default AgeCalculator;
