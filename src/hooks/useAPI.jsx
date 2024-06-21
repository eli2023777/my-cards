import { useState } from 'react';
import axios from 'axios';


const useAPI = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const callAPI = async (url, method = METHOD.GET_ALL, payload) => {
        const token = localStorage.getItem('token');
        let jsonObj;
        if (payload) {
            jsonObj = {
                title: payload.title,
                subtitle: payload.subtitle,
                description: payload.description,
                phone: payload.phone,
                email: payload.email,

                image: {
                    url: payload.url,
                    alt: payload.alt,
                },

                address: {
                    state: payload.state,
                    country: payload.country,
                    city: payload.city,
                    street: payload.street,
                    houseNumber: payload.houseNumber,
                    zip: payload.zip,
                },
            };
        };

        try {
            setIsLoading(true);
            let response;

            switch (method) {
                case METHOD.GET_ALL:
                    response = await axios.get(url);
                    break;

                case METHOD.GET_ONE:
                    response = await axios.get(`${url}/${payload}`);
                    break;

                case METHOD.GET_ALL_MY_CARDS:
                    response = await axios.get(`${url}/my-cards`,
                        {
                            headers: {
                                'x-auth-token': token
                            }
                        }
                    );
                    break;

                case METHOD.CREATE:
                    response = await axios.post(url, jsonObj,
                        {
                            headers: {
                                'x-auth-token': token
                            },
                        },
                    );
                    break;

                case METHOD.UPDATE:
                    response = await axios.put(`${url}/${payload._id}`, jsonObj,
                        // response = await axios.put(`${url}/665cbdcb00b4d006b417eccb`, jsonObj,
                        {
                            headers: {
                                'x-auth-token': token
                            }
                        });
                    break;

                case METHOD.LIKE_UNLIKE:
                    response = await axios.patch(`${url}/${payload}`, {},
                        {
                            headers: {
                                'x-auth-token': token
                            }
                        });
                    break;

                case METHOD.DELETE:
                    response = await axios.delete(`${url}/${payload._id}`,
                        {
                            headers: {
                                'x-auth-token': token
                            },
                        },
                        {
                            "bizNumber": payload.bizNumber,
                        });
                    break;
            }
            setData(response.data);
        } catch (err) {
            setError(err.message);
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return [data, error, isLoading, callAPI];
}

export const METHOD = {
    GET_ALL: 'GET_ALL',
    GET_ONE: 'GET_ONE',
    GET_ALL_MY_CARDS: 'GET_ALL_MY_CARDS',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    LIKE_UNLIKE: 'LIKE_UNLIKE',
};

export default useAPI
