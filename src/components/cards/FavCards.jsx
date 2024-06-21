import React, { useState, useEffect, useContext } from 'react';
import CardView from './CardView';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../style/CardsPage.css';
import APIContext from '../../contexts/APIContext';
import useAPI, { METHOD } from '../../hooks/useAPI';
import { jwtDecode } from "jwt-decode";



const FavCards = ({ isDark }) => {
    const UI_STATE = {
        NONE: 'NONE',
        READ: 'READ',
    }


    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [uiState, setUIState] = useState(UI_STATE.NONE);

    const [data, error, isLoading, callAPI] = useAPI();
    const API = useContext(APIContext); // Consumer Hook

    const [hoveredCard, setHoveredCard] = useState({});
    const [isHovered, setIsHovered] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);

    const userID = decodedToken._id;


    // For EDIT
    const updateList = (card) => {
        const newList = cards.map(c => c._id === card._id ? card : c);
        setCards(newList);
        setUIState(UI_STATE.NONE);
    }

    const handelHovered = (card) => {
        setHoveredCard(card);
        setIsHovered(true);
    }

    const handelView = (card) => {
        setSelectedCard(card);
        setUIState(UI_STATE.READ);
    };

    const handelDelete = (card) => {
        callAPI(API, METHOD.LIKE_UNLIKE, card._id);
        setIsDelete(true);
    };

    useEffect(() => {
        if (isDelete)
            cards = cards.filter(c => c._id !== cards._id);
    }, [isDelete]);

    useEffect(() => {
        if (API)
            callAPI(API, METHOD.GET_ALL_MY_CARDS);
    }, [API]);

    useEffect(() => {
        if (data) {
            let favCards = data.filter(c => c.likes.find(l => l === userID));
            console.log(userID);
            setCards(favCards);
        }
    }, [data]);




    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!cards) return <div>No results</div>;

    return (
        <div>

            {uiState === UI_STATE.READ && <CardView id={selectedCard._id} callback={updateList} />}

            {uiState === UI_STATE.NONE &&

                <div>

                    <h1>Favorites Cards </h1>
                    <p>Manage Your Favorite Cards: <br /> View, Edit, and Delete with Ease</p>

                    <br />
                    <br />

                    <div className='cardsGrid' >

                        {cards.map(card => (

                            <Card style={{ width: '18rem' }} key={card._id} className={isHovered && hoveredCard._id === card._id ? 'hoveredCard' : 'unHoveredCard'}
                                data-bs-theme={!isDark && 'dark'}
                                onMouseLeave={() => setIsHovered(false)}
                                onMouseEnter={() => handelHovered(card)}
                                onClick={() => { handelView(card) }}
                            >

                                <Card.Img variant="top" className='imgCard' src={card.image.url} alt={card.image.alt} />
                                <Card.Body className='bodyCard'>
                                    <Card.Title style={{ fontSize: '30px' }}>{card.title}</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    {card.phone}
                                    <br />
                                    {card.email}
                                    <br />
                                    <br />
                                    <br />

                                    {isHovered && hoveredCard._id === card._id && (
                                        <div>

                                            <Button variant="primary" onClick={() => handelDelete(card)}>Delete Card from Favorites</Button>
                                            &nbsp;

                                        </div>
                                    )}

                                </Card.Body>

                            </Card>
                        ))}

                    </div>
                    <br />
                    <br />
                    <br />
                </div>
            }

        </div >

    )
}

export default FavCards
