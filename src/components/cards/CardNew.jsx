import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../style/CardNew.css';
import useForm from '../../hooks/useForm';



const CardNew = ({ callback }) => {


    const [card, handelChange, handelSubmit, isLoading, errors, message, isSuccessMessage] = useForm(callback, null);


    return (
        <div>
            <br />
            <h1>Create Card</h1>
            <br />
            <br />

            <Form onSubmit={handelSubmit}>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name='title' placeholder="Enter Title" onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['title']}</div>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Subtitle</Form.Label>
                    <Form.Control type="text" name='subtitle' placeholder="Enter Subtitle" onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['subtitle']}</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name='description' placeholder="Enter Description" onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['description']}</div>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" placeholder="Enter Phone" onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['phone']}</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter Email" onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['email']}</div>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" name='url' placeholder="Enter Image URL" onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['url']}</div>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Image ALT</Form.Label>
                    <Form.Control type="text" name='alt' placeholder="Enter Image ALT" onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['alt']}</div>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name='state' placeholder="Enter State" onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="country" name='country' placeholder="Enter Country" onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="city" name='city' placeholder="Enter City" onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="street" name='street' placeholder="Enter Street" onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>House Number</Form.Label>
                    <Form.Control type="number" name='houseNumber' placeholder="Enter House Number" onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['houseNumber']}</div>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="number" name='zip' placeholder="Enter Zip" onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['zip']}</div>
                </Form.Group>

                <div>
                    <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '32px' }}>
                        Submit
                    </Button>

                    <div className={isSuccessMessage ? 'successMessage' : 'errorMessage'}>{message}</div>

                </div>
            </Form>
            <br />
            <br />
            <br />
        </div >
    )
}

export default CardNew
