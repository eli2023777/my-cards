import { useState, useEffect, useContext } from 'react';
import APIContext from '../contexts/APIContext';
import useAPI, { METHOD } from './useAPI';
import Card from '../models/Card';
import { useNavigate } from 'react-router-dom';


const useForm = (callback, selectedCard) => {

    const UI_ACTION = {
        NONE: 'NONE',
        GET_ONE: 'GET_ONE',
        CREATE: 'CREATE',
        UPDATE: 'UPDATE',
    }

    const [uiAction, setUIAction] = useState(!selectedCard ? UI_ACTION.NONE : UI_ACTION.GET_ONE);
    const [card, setCard] = useState(!selectedCard ? new Card() : selectedCard);
    const [errors, setErrors] = useState({}); // errors is a JS object, with the key = field name, and value = error message
    const [message, setMesssage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [data, error, isLoading, callAPI] = useAPI();
    const API = useContext(APIContext);
    const navigate = useNavigate();

    // For Edit mode
    const [url, setURL] = useState();
    const [alt, setALT] = useState();


    const handelChange = (e) => {
        const newCard = new Card(card._id, card.title, card.subtitle, card.description, card.phone,
            card.email, card.url, card.alt, card.state, card.country, card.city, card.street, card.houseNumber, card.zip);

        //For EDIT MODE
        if (!card.url && selectedCard) setURL(selectedCard.url);
        if (!card.alt && selectedCard) setALT(selectedCard.alt);

        newCard.updateField(e.target.name, e.target.value);
        setCard(newCard);
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        const lclErrors = card.validate();

        // 1. Check if form is valid?
        if (Object.keys(lclErrors).length === 0) {
            // Delete errors
            setErrors({});

            // 2. Success
            setMesssage('Successfully created a new card');
            setIsSuccessMessage(true);


            if (!selectedCard) { // CREATE MODE
                setUIAction(UI_ACTION.CREATE);
                callAPI(API, METHOD.CREATE, card);
            } else {  // EDIT MODE 
                setUIAction(UI_ACTION.UPDATE);
                callAPI(API, METHOD.UPDATE, card);
            }

        } else {
            // 3. Fail
            setMesssage('Invalid form values');
            setIsSuccessMessage(false);
            setErrors(lclErrors)
        }
    };

    // Errors listener
    useEffect(() => {
        if (Object.keys(errors).length > 0)
            console.log('Errors:', errors);
    }, [errors]);


    useEffect(() => {
        if (isSuccessMessage) {
            const timer = setTimeout(() => {
                navigate('/myCards')
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, navigate]);


    useEffect(() => {
        if (data) {
            if (uiAction === UI_ACTION.GET_ONE) {
                // GET-ONE MODE
                if (data.image && data.address) {
                    const newCard = new Card(data._id, data.title, data.subtitle, data.description, data.phone,
                        data.email, data.image.url, data.image.alt, data.address.state, data.address.country, data.address.city, data.address.street, data.address.houseNumber, data.address.zip);
                    setCard(newCard);
                }

            } else if (uiAction === UI_ACTION.CREATE || uiAction === UI_ACTION.UPDATE) {
                // CREATE / UPDATE MODE (after submit)
                callback(card);
            }
        }
    }, [data, uiAction]);


    // Edit mode only
    useEffect(() => {
        if (selectedCard) {
            callAPI(API, METHOD.GET_ONE, card._id);
            setCard(selectedCard);
        }
    }, [selectedCard]);



    return [card, handelChange, handelSubmit, isLoading, errors, message, isSuccessMessage, url, alt];


}

export default useForm
