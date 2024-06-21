import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './signUp.css';
import FullUser from '../../models/FullUser';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [user, setUser] = useState(new FullUser());
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();
    const [message, setMesssage] = useState('');
    const [errors, setErrors] = useState({}); // errors is a JS object, with the key = field name, and value = error message


    const handelChange = (e) => {
        const currUser = new FullUser(user.firstName, user.lastName, user.phone, user.email, user.password, user.url, user.alt,
            user.state, user.country, user.city, user.street, user.houseNumber, user.zip);
        currUser.updateField(e.target.name, e.target.value);
        setUser(currUser);
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        const lclErrors = user.validate();

        // 1. Check if form is valid?
        if (Object.keys(lclErrors).length === 0) {
            // Delete errors
            setErrors({});

            // 2. Success
            setMesssage('You have successfully registered');
            onSignUp();
        } else {
            // 3. Fail
            setMesssage('Invalid form values');
            setErrors(lclErrors)
        }
    };


    const onSignUp = async () => {
        try {
            await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', {
                name: {
                    first: user.firstName,
                    last: user.lastName,
                },
                phone: user.phone,
                email: user.email,
                password: user.password,
                image: {
                    url: user.url,
                    alt: user.alt,
                },
                address: {
                    state: user.state,
                    country: user.country,
                    city: user.city,
                    street: user.street,
                    houseNumber: user.houseNumber,
                    zip: user.zip,
                },
                isBusiness: true,
            });
            setIsSignUp(true);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (errors)
            console.log('Errors:', errors);
    }, [errors]);

    useEffect(() => {
        if (isSignUp) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSignUp]);


    return (
        <div>
            <h1>Sign Up</h1>
            <br /><br />

            <Form onSubmit={handelSubmit}>

                <Form.Group className="mb-3 grid-item" controlId="formBasicName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="name" name='firstName' placeholder="First Name" onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['firstName']}</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Last Name" onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['lastName']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" placeholder="Phone" onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['phone']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Email" onChange={handelChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['password']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" name="url" placeholder="url" onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['url']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image ALT</Form.Label>
                    <Form.Control type="text" name="alt" placeholder="alt" onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['alt']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name="state" placeholder="State" onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['state']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" name="country" placeholder="Country" onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['country']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="city" placeholder="City" onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['city']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" name="street" placeholder="Street" onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['street']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>House Number</Form.Label>
                    <Form.Control type="number" name="houseNumber" placeholder="House Number" onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['houseNumber']}</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="number" name="zip" placeholder="Zip Code" onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['zip']}</div>
                </Form.Group>
                {/* 
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}

                <Button variant="primary" type="submit" style={{ height: '50%', marginBottom: '2px' }}>
                    Submit
                </Button>

                <div>{message}</div>

            </Form>
            <br />
            <br />
            <br />
            <br />
        </div >
    )
}

export default SignUp
