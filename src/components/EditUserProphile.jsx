import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import FullUserForUpdate from '../models/FullUserForUpdate'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import './auth/signUp.css';

const EditUserProphile = () => {

    const [data, setData] = useState({});
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userID = decodedToken._id;
    const [user, setUser] = useState(new FullUserForUpdate());
    // const [isChange, setIsChange] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const [message, setMesssage] = useState('');
    const [errors, setErrors] = useState({}); // errors is a JS object, with the key = field name, and value = error message

    const handelChange = (e) => {

        // Prevent deletion of old user information that has not been re-updated by the user
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        // debugger;

        const lclErrors = user.validate();

        // 1. Check if form is valid?
        if (Object.keys(lclErrors).length === 0) {
            // Delete errors
            setErrors({});

            // 2. Success
            setMesssage('You user information has been successfully updated!');
            setIsSuccess(true);

            onEditUser();
        } else {
            // 3. Fail
            setMesssage('Invalid form values. Please try again.');
            setIsSuccess(false);

            setErrors(lclErrors);
        }
    };

    const onEditUser = async () => {
        try {
            await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userID}`, {
                name: {
                    first: user.firstName,
                    last: user.lastName,
                },
                phone: user.phone,
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
                }
            },
                {
                    headers: {
                        'x-auth-token': token
                    }
                }
            );
            setIsSuccess(true);
        } catch (e) {
            console.log(e);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userID}`,
                {
                    headers: {
                        'x-auth-token': token
                    }
                }
            )
            setData(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    // GET-ONE MODE
    useEffect(() => {
        getUserDetails();
    }, []);


    // GET-ONE MODE
    useEffect(() => {
        if (data) {
            // Make sure the objects are not null, before loading the keys
            if (data.name && data.image && data.address) {
                const newUser = new FullUserForUpdate(data._id, data.name.first, data.name.last, data.phone, data.image.url, data.image.alt, data.address.state, data.address.country, data.address.city, data.address.street, data.address.houseNumber, data.address.zip);
                setUser(newUser);
            }
        }
    }, [data]);


    useEffect(() => {
        if (errors)
            // setErrors(errors);
            console.log(errors);
    }, [errors]);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess]);


    return (
        <div>
            <h1>Edit Prophile</h1>
            <br /><br />

            <Form onSubmit={handelSubmit}>

                <Form.Group className="mb-3 grid-item" controlId="formBasicName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="name" name='firstName' value={user.firstName} onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['firstName']}</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" value={user.lastName} onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['lastName']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" value={user.phone} onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['phone']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" name="url" value={user.url} onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['url']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image ALT</Form.Label>
                    <Form.Control type="text" name="alt" value={user.alt} onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['alt']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name="state" value={user.state} onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['state']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" name="country" value={user.country} onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['country']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="city" value={user.city} onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['city']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" name="street" value={user.street} onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['street']}</div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>House Number</Form.Label>
                    <Form.Control type="number" name="houseNumber" value={user.houseNumber} onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['houseNumber']}</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="number" name="zip" value={user.zip} onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['zip']}</div>
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Submit
                </Button>

            </Form>
            <br />
            <div style={{ color: isSuccess ? 'green' : 'red' }}>{message}</div>

            <br />
            <br />
            <br />
        </div >
    )
}

export default EditUserProphile
