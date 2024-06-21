import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../style/CardNew.css';
import useForm from '../../hooks/useForm';

const CardEdit = ({ selectedCard, callback }) => {

    const [card, handelChange, handelSubmit, isLoading, errors, message, isSuccessMessage]
        = useForm(callback, selectedCard);

    if (isLoading) return <div>Loading...</div>

    return (
        <div>

            <h3>Edit Card</h3>
            <br />
            <br />

            <Form onSubmit={handelSubmit}>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name='title' value={card.title} onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['title']}</div>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Subtitle</Form.Label>
                    <Form.Control type="text" name='subtitle' value={card.subtitle} onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['subtitle']}</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name='description' value={card.description} onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['description']}</div>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" value={card.phone} onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['phone']}</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={card.email} onChange={handelChange} />
                    <div style={{ color: 'red' }}>{errors && errors['email']}</div>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" name='url' value={card.url} onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['url']}</div>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Image ALT</Form.Label>
                    <Form.Control type="text" name='alt' value={card.alt} onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['alt']}</div>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name='state' value={card.state} onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['email']}</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="country" name='country' value={card.country} onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['country']}</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="city" name='city' value={card.city} onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['city']}</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="street" name='street' value={card.street} onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['street']}</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>House Number</Form.Label>
                    <Form.Control type="number" name='houseNumber' value={card.houseNumber} onChange={handelChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <div style={{ color: 'red' }}>{errors && errors['houseNumber']}</div>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="number" name='zip' value={card.zip} onChange={handelChange} />
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
        </div>
    )
}

export default CardEdit
