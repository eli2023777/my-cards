import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import CardView from './CardView';
import useAPI, { METHOD } from '../../hooks/useAPI';
import APIContext from '../../contexts/APIContext';
import '../style/CardsPage.css';


const CardsPage = ({ isDark }) => {
    const UI_STATE = {
        NONE: 'NONE',
        CREATE: 'CREATE',
        READ: 'READ',
        EDIT: 'EDIT',
    }

    // const [data, error, isLoading, callAPI] = useAPI();
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [uiState, setUIState] = useState(UI_STATE.NONE);
    const [data, error, isLoading, callAPI] = useAPI();
    const API = useContext(APIContext); // Consumer Hook

    const [hoveredCard, setHoveredCard] = useState({});
    const [isHovered, setIsHovered] = useState(false);


    // -- Without reducer -- 

    useEffect(() => {
        callAPI(API, METHOD.GET_ALL);
    }, []);

    useEffect(() => {
        if (data)
            setCards(data);
    }, [data]);

    // For HOVERED mode
    const handelHovered = (card) => {
        setHoveredCard(card);
        setIsHovered(true);
    }

    // For VIEW mode
    const handelView = (card) => {
        setSelectedCard(card)
        setUIState(UI_STATE.READ);
    };


    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!cards) return <div>No results</div>

    return (
        <div>

            {uiState === UI_STATE.NONE && (
                <div>
                    <br />
                    <h1>Business Cards</h1>
                    <p>Our business card website allows you to easily create and manage digital business cards, <br /> with all the information you need at your fingertips.</p>
                    <br />
                    <br />

                    <div>

                        <div className='cardsGrid' >

                            {
                                cards.slice(0, 12).map(card => (

                                    <Card style={{ width: '18rem' }} key={card._id} data-bs-theme={!isDark && 'dark'} onMouseLeave={() => setIsHovered(false)}
                                        onMouseEnter={() => handelHovered(card)}
                                        onClick={() => {
                                            handelView(card);
                                        }}
                                        className={isHovered && hoveredCard._id === card._id ? 'hoveredCard' : 'unHoveredCard'}>

                                        <Card.Img className='imgCard' variant="top" src={card.image.url} alt={card.image.alt} />
                                        <Card.Body className='bodyCard'>
                                            <Card.Title style={{ fontSize: '30px' }}>{card.title}</Card.Title>
                                            <Card.Text >
                                                {card.description}
                                            </Card.Text>
                                            <div style={{ width: '100%', height: '1px', background: '#006d318b' }}></div>
                                            <br />
                                            {card.phone}
                                            <br />
                                            {card.email}

                                        </Card.Body>
                                    </Card>
                                ))
                            }
                        </div>

                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>

            )}

            <div>
                {uiState === UI_STATE.READ && <CardView id={selectedCard._id} fromMainPage={true} />}
            </div>

        </div >
    )
};

export default CardsPage



