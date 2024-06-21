import React, { useEffect, useContext, useState } from 'react';
import useAPI, { METHOD } from '../../hooks/useAPI';
import APIContext from '../../contexts/APIContext';
import CardEdit from './CardEdit';
import Button from 'react-bootstrap/Button';
import '../style/CardView.css';

const UI_STATE = {
    NONE: 'NONE',
    EDIT: 'EDIT',
}

const CardView = ({ id, callback, fromMainPage }) => {
    const [data, error, isLoading, callAPI] = useAPI();
    const [uiState, setUIState] = useState(UI_STATE.NONE);
    const [selectedCard, setSelectedCard] = useState(null);
    const API = useContext(APIContext);
    const [url, setURL] = useState('');
    const [alt, setALT] = useState('');

    const handelEdit = () => {
        setSelectedCard(data);
        setUIState(UI_STATE.EDIT);
    };

    useEffect(() => {
        if (id)
            callAPI(API, METHOD.GET_ONE, id)
    }, [id])

    useEffect(() => {
        if (data.image) {
            setURL(data.image.url);
            setALT(data.image.url);
        }
    }, [data.image]);


    useEffect(() => {
        if (callback)
            setUIState(UI_STATE.NONE);
    }, [callback]);



    if (!data) return <div>No results</div>
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>



    return (
        <div>

            {uiState === UI_STATE.EDIT && <CardEdit selectedCard={selectedCard}
                callback={() => callback} />
            }

            {uiState === UI_STATE.NONE &&
                <div className='viewCardContainer'>
                    <div className='viewCard'>

                        <div>
                            <Button variant="light" onClick={() => document.location.reload()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={'20px'} viewBox="0 0 512 512"><path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z" /></svg>
                            </Button>
                        </div>

                        <div>

                            <div>
                                <img style={{ width: '80%' }}
                                    src={url} alt={alt}
                                    onClick={() => window.open(url, '_blank')}
                                />
                            </div>

                        </div>

                        <form>
                            <table>
                                <tbody>
                                    <h2>
                                        {data.title}
                                    </h2>

                                    <tr>
                                        <td className='text'>
                                            {data.subtitle}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='text'>
                                            {data.description}
                                        </td>
                                    </tr>

                                    <br />
                                    <tr>
                                        <td className='label'>
                                            Phone:
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='text'>
                                            {data.phone}
                                        </td>
                                    </tr>
                                    <br />

                                    <tr>
                                        <td className='label'>
                                            Email:
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='text'>
                                            {data.email}
                                        </td>
                                    </tr>
                                    <br />

                                    <tr>
                                        <td className='label'>
                                            Address:
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='text'>
                                            {data.address && data.address.houseNumber} {data.address && data.address.street},
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text'>
                                            {data.address && data.address.city} {data.address && data.address.country}
                                        </td>
                                    </tr>
                                    <br />

                                    {/* Allow Edit, just when user came from 'myCards' */}
                                    {!fromMainPage &&
                                        <tr>
                                            <td className='text'>
                                                <Button variant="light" onClick={handelEdit}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={'25px'} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                                                </Button>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </form>

                    </div>

                    <div>
                        <iframe
                            width="600"
                            height="450"
                            style={{ border: '0' }}
                            loading="lazy"
                            allowfullscreen
                            referrerpolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD5tP7EXDwb9u7VO5KEiX8dFIc5z2bEAAQ
    &q=${data.address && data.address.houseNumber}+${data.address && data.address.street}+${data.address && data.address.city}+${data.address && data.address.country}+${data.address && data.address.state}`}>
                        </iframe>
                    </div>

                </div>
            }
            <br />
            <br />

        </div >
    )
}

export default CardView
