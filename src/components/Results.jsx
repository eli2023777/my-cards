import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './style/CardsPage.css';



const Results = ({ results, isDark }) => {
    const UI_STATE = {
        NONE: 'NONE',
        CREATE: 'CREATE',
        READ: 'READ',
        EDIT: 'EDIT',
    }

    const [uiState, setUIState] = useState(UI_STATE.NONE);
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredCard, setHoveredCard] = useState({});
    const [selectedCard, setSelectedCard] = useState(null);
    const [isAnyResults, setIsAnyResults] = useState(true);



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

    useEffect(() => {
        if (results.length === 0)
            setIsAnyResults(false);
        else setIsAnyResults(true);
    }, [results]);

    return (
        <div>
            <h1>{isAnyResults ? 'Results' : 'No results'}</h1>
            <br />
            <br />

            <div className='cardsGrid'>
                {results.map(card => (
                    <Card style={{ width: '18rem' }} key={card._id} data-bs-theme={!isDark && 'dark'} onMouseLeave={() => setIsHovered(false)}
                        onMouseEnter={() => handelHovered(card)}
                        onClick={() => { handelView(card) }}
                        className={isHovered && hoveredCard._id === card._id ? 'hoveredCard' : ''}>

                        <Card.Img variant="top" src={card.image.url} alt={card.image.alt} />
                        <Card.Body>
                            <Card.Title>{card.title}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            {card.phone}
                            <br />
                            {card.email}
                            <br />
                            <br />
                        </Card.Body>
                    </Card>
                )
                )
                }
            </div>

        </div>
    )
}

export default Results
