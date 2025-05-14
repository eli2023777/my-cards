import React, { useState, useEffect, useContext } from 'react';
import useAPI, { METHOD } from '../../hooks/useAPI';
import APIContext from '../../contexts/APIContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../style/CardsPage.css';
import CardNew from './CardNew';
import CardView from './CardView';
import CardEdit from './CardEdit';


const MyCards = () => {
    const UI_STATE = {
        NONE: 'NONE',
        CREATE: 'CREATE',
        READ: 'READ',
        EDIT: 'EDIT',
    }

    const [cards, setCards] = useState([]);
    const [cardForDelete, setCardForDelete] = useState({});
    const [selectedCard, setSelectedCard] = useState(null);
    const [uiState, setUIState] = useState(UI_STATE.NONE);

    const [data, error, isLoading, callAPI] = useAPI();
    const API = useContext(APIContext); // Consumer Hook

    const [hoveredCard, setHoveredCard] = useState({});
    const [isHovered, setIsHovered] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const [likeIconClick, setLikeIconClick] = useState(false);
    const [likeIconHovered, setLikeIconHovered] = useState(false);
    const [idForAPILike, setIdForAPILike] = useState('');


    const handelLikeClick = (id) => {
        const newLikeState = !likeIconClick[id];
        setLikeIconClick(prevState => ({
            ...prevState,
            [id]: newLikeState
        }));
        localStorage.setItem(id, JSON.stringify(newLikeState));
        setIdForAPILike(id);
    }

    useEffect(() => {
        const storedLikes = {};
        cards.forEach(card => {
            const isLiked = JSON.parse(localStorage.getItem(card._id));
            if (isLiked !== null) {
                storedLikes[card._id] = isLiked;
            }
        });
        setLikeIconClick(storedLikes);
    }, [cards]);

    // For CREATE
    const addToList = (newCard) => {
        const newList = [...cards, newCard];
        setCards(newList);
        setUIState(UI_STATE.NONE);
    }

    // For EDIT
    const updateList = (card) => {
        const newList = cards.map(c => c._id === card._id ? card : c);
        setCards(newList);
        setUIState(UI_STATE.NONE);
    }

    const handelHovered = (card) => {
        setHoveredCard(card);
        setIsHovered(true);

        let id = localStorage.getItem(card._id);
        if (id === 'true')
            setLikeIconClick(true);
    };

    const handelView = (card) => {
        setSelectedCard(card)
        setUIState(UI_STATE.READ);
    };


    const handelEdit = (card) => {
        setSelectedCard(card);
        setUIState(UI_STATE.EDIT);
    };

    const handelDelete = (card) => {
        const userConfirmed = window.confirm(`Are you sure you want to delete this card?
             You will not be able to restore after confirmation.`);
        if (userConfirmed) {
            setCards(cards.filter(c => c._id !== card._id));
            setIsDelete(true);
            setCardForDelete(card);
        }
    };

    useEffect(() => {
        if (isDelete)
            callAPI(API, METHOD.DELETE, cardForDelete);
    }, [isDelete, cardForDelete]);

    useEffect(() => {
        callAPI(API, METHOD.GET_ALL_MY_CARDS);
    }, []);

    useEffect(() => {
        if (data.map)
            data.map(c => {
                if (c._id)
                    setCards(data)
            });
    }, [data]);

    useEffect(() => {
        if (idForAPILike !== '') {
            callAPI(API, METHOD.LIKE_UNLIKE, idForAPILike);
            // localStorage.setItem(idForAPILike, JSON.stringify(likeIconClick));
        }
    }, [
        // likeIconClick, 
        idForAPILike]);


    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!cards) return <div>No results</div>;

    return (
        <div>

            {uiState === UI_STATE.READ && <CardView id={selectedCard._id} callback={updateList} />}
            {uiState === UI_STATE.EDIT && <CardEdit selectedCard={selectedCard}
                callback={updateList} />
            }

            {uiState === UI_STATE.NONE &&
                <div div >

                    <h1>My Cards</h1>
                    <p>Welcome to your business card dashboard!
                        <br /> Here you can manage and update all your digital business cards with ease.</p>
                    <br />
                    <br />

                    <div><Button variant="primary" onClick={() => { setUIState(UI_STATE.CREATE) }}>
                        Add New Card</Button>
                    </div>

                    <br />
                    <br />

                    <div className='cardsGrid' >

                        {cards.map(card => (

                            <Card style={{ width: '18rem' }} key={card._id} className={isHovered && hoveredCard._id === card._id ? 'hoveredCard' : 'unHoveredCard'}
                                onMouseLeave={() => { setIsHovered(false); setLikeIconClick(false); }}
                                onMouseEnter={() => handelHovered(card)}
                                onClick={() => { handelView(card) }}
                            >

                                <Card.Img variant="top" className='imgCard' src={card.image && card.image.url} alt={card.image && card.image.alt} />
                                <Card.Body className='bodyCard'>
                                    <Card.Title style={{ fontSize: '30px' }}>{card.title}</Card.Title>
                                    <Card.Text>
                                        {card.description}
                                    </Card.Text>
                                    <div style={{ width: '100%', height: '2px', background: '#360a8e67' }}></div>
                                    {card.phone}
                                    <br />
                                    {card.email}
                                    <br />
                                    <br />

                                    {isHovered && hoveredCard._id === card._id && (
                                        <div>

                                            {/* Like btn */}
                                            <Button variant="none"
                                                onMouseEnter={() => setLikeIconHovered(true)}
                                                onMouseLeave={() => setLikeIconHovered(false)}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handelLikeClick(card._id);
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={'20px'} viewBox="0 0 512 512"><path d={
                                                    likeIconClick || !likeIconClick && likeIconHovered ?
                                                        "M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                                                        :
                                                        "M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                                                }
                                                    fill={likeIconClick || !likeIconClick && likeIconHovered ? '#e20000' : ''} /></svg>
                                            </Button>
                                            &nbsp;

                                            {/* Edit btn */}
                                            <Button variant="none" onClick={(e) => {
                                                e.stopPropagation(); handelEdit(card);
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={'20px'} className='editIcon' viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                                            </Button>
                                            &nbsp;



                                            {/* Delete btn */}
                                            <Button variant="none"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handelDelete(card);
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={'15px'} className='deleteIcon' viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                            </Button>
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

            <div>
                {uiState === UI_STATE.CREATE && <CardNew callback={addToList} />}
            </div>

        </div >
    )
}

export default MyCards
