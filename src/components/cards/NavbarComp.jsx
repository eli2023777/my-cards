import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LogIn from '../auth/LogIn';
import SignUp from '../auth/SignUp';
import CardsPage from './CardsPage';
import MyCards from './MyCards';
import About from '../About';
import '../style/NavbarComp.css';
import axios from 'axios';
import APIContext from '../../contexts/APIContext';
import Results from '../Results';
import FavCards from './FavCards';
import CardView from './CardView';
import { jwtDecode } from "jwt-decode";
import EditUserProphile from '../EditUserProphile';


const NavbarComp = ({ toggleDarkMode }) => {

    // Defined the input from Search Bar
    const [inputSearch, setInputSearch] = useState('');

    const isLoginInitial = () => {
        const x = localStorage.getItem('isLoginMode');
        if (x === 'true')
            return true;
        else
            return false;
    };

    // Defined the Log-in mode 
    const [isLoginMode, setIsLoginMode] = useState(isLoginInitial);
    const API = useContext(APIContext);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});
    const [isVisibleNav, setIsVisibleNav] = useState(true);


    const UI_ICONS_FOOTER_STATE = {
        HOME: 'HOME',
        LIKE: 'LIKE',
        ABOUT: 'ABOUT'
    }

    //Footer icons states
    const [uiFooterState, setUIFooterState] = useState(localStorage.getItem('uiFooterState'));
    const [homeIconFooter, setHomeIconFooter] = useState(UI_ICONS_FOOTER_STATE.HOME ? true : false);
    const [likeIconFooter, setLikeIconFooter] = useState(UI_ICONS_FOOTER_STATE.LIKE ? true : false);
    const [aboutIconFooter, setAboutIconFooter] = useState(UI_ICONS_FOOTER_STATE.ABOUT ? true : false);


    const footerToggel = (uiFooterState) => {
        switch (uiFooterState) {
            case uiFooterState = UI_ICONS_FOOTER_STATE.HOME:
                setHomeIconFooter(true);
                setLikeIconFooter(false);
                setAboutIconFooter(false);
                break;
            case uiFooterState = UI_ICONS_FOOTER_STATE.LIKE:
                setHomeIconFooter(false);
                setLikeIconFooter(true);
                setAboutIconFooter(false);
                break;

            case uiFooterState = UI_ICONS_FOOTER_STATE.ABOUT:
                setHomeIconFooter(false);
                setLikeIconFooter(false);
                setAboutIconFooter(true);
                break;
        }
    };

    useEffect(() => {
        localStorage.setItem('uiFooterState', uiFooterState);
    }, [uiFooterState]);

    useEffect(() => {
        footerToggel(uiFooterState);
    }, []);

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userID = decodedToken._id;
            try {
                const res = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userID}`,
                    {
                        headers: {
                            'x-auth-token': token
                        }
                    }
                );
                setUser(res.data);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Check if is Dark by localStorage
    const getInitialDarkMode = () => {
        const savedMode = localStorage.getItem('isDark');
        // convert string to boolean
        return savedMode === 'true';
    };

    // Defined the Dark mode by the function
    const [isDark, setIsDark] = useState(getInitialDarkMode);

    const isLoginFn = () => {
        setIsLoginMode(true);
    }

    // For Search bar
    const handelChange = (value) => {
        setInputSearch(value);
        fetchData(value);
    }

    // For Search bar when using Enter
    const handelEnterSearch = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            window.location.href = '/results';
            fetchData(e.target.value);
        }
    };

    // For Search bar
    const fetchData = async (value) => {
        let response;
        try {
            response = await axios.get(API);
        } catch (e) {
            console.log(e);
        }

        const data = response.data;

        const dataResult = data.filter((card) => {
            return (
                value &&
                card &&
                card.title.toLowerCase().includes(value))
        });

        console.log(dataResult);
        setResults(dataResult);
    };

    useEffect(() => {
        localStorage.setItem('isLoginMode', isLoginMode);
        if (isLoginMode)
            fetchUser();

    }, [isLoginMode]);

    useEffect(() => {
        localStorage.setItem('isDark', isDark);
    }, [isDark]);


    const dark = () => {
        // 1. Toggle dark mood of ALL PAGE (by bootstarp color theme) without the navbar, using the function by props.
        toggleDarkMode();

        // 2. Toggle dark mood of The NAVBAR
        setIsDark(prevIsDark => !prevIsDark);
    }

    if (isLoading) return <div>Loading...</div>

    const basename = process.env.REACT_APP_BASENAME;


    return (
        <div>
            <BrowserRouter basename={basename}>
                {isVisibleNav &&
                    ['md'].map((expand) => (
                        <Navbar key={expand} expand={expand} sticky="top" className="bg-body-tertiary mb-3 header"
                            bg={!isDark && ('dark')} data-bs-theme={!isDark && ('dark')}>
                            <Container fluid>

                                <Navbar.Brand >
                                    {/* Logo */}
                                    <Link to='/'>
                                        <img src={require("../business-card.png")} alt="bcard" className='logoImg' />
                                    </Link>
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                                <Navbar.Offcanvas
                                    id={`offcanvasNavbar-expand-${expand}`}
                                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                    placement="end"
                                >
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                        </Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Nav className="justify-content-end flex-grow-1 pe-3 ">
                                            <Link className={!isDark ? 'darkLink' : 'link'} to="/about">About</Link>
                                            {isLoginMode &&
                                                <Nav className="justify-content-end flex-grow-1 pe-3 ">
                                                    <Link className={!isDark ? 'darkLink' : 'link'} to="/favCards">Fav Cards</Link>
                                                    <Link className={!isDark ? 'darkLink' : 'link'} to="/myCards">My Cards</Link>
                                                </Nav>
                                            }
                                        </Nav>

                                        {/* Search bar */}
                                        <Form className="d-flex search">
                                            <Form.Control
                                                type="search"
                                                placeholder="Search"
                                                className="me-2"
                                                aria-label="Search"
                                                onChange={(e) => handelChange(e.target.value)}
                                                onKeyDown={handelEnterSearch}
                                            />
                                            <Link to='/results' className='link searchClick'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={'18px'} viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                                            </Link>
                                        </Form>

                                        {/* Sign-up and Log-in */}
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            {!isLoginMode && (
                                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                                    <Link to="/signUp" className={!isDark ? 'darkLink' : 'link'}>Sign Up</Link>
                                                    <Link to="/logIn" className={!isDark ? 'darkLink' : 'link'}>Log In</Link>
                                                </Nav>
                                            )}

                                            <Button variant="none" onClick={dark}
                                            >
                                                {isDark ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className='darkBtn' width={'15px'} viewBox="0 0 384 512"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" /></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={'20px'} className='lightBtn' viewBox="0 0 512 512"><path d="M375.7 19.7c-1.5-8-6.9-14.7-14.4-17.8s-16.1-2.2-22.8 2.4L256 61.1 173.5 4.2c-6.7-4.6-15.3-5.5-22.8-2.4s-12.9 9.8-14.4 17.8l-18.1 98.5L19.7 136.3c-8 1.5-14.7 6.9-17.8 14.4s-2.2 16.1 2.4 22.8L61.1 256 4.2 338.5c-4.6 6.7-5.5 15.3-2.4 22.8s9.8 13 17.8 14.4l98.5 18.1 18.1 98.5c1.5 8 6.9 14.7 14.4 17.8s16.1 2.2 22.8-2.4L256 450.9l82.5 56.9c6.7 4.6 15.3 5.5 22.8 2.4s12.9-9.8 14.4-17.8l18.1-98.5 98.5-18.1c8-1.5 14.7-6.9 17.8-14.4s2.2-16.1-2.4-22.8L450.9 256l56.9-82.5c4.6-6.7 5.5-15.3 2.4-22.8s-9.8-12.9-17.8-14.4l-98.5-18.1L375.7 19.7zM269.6 110l65.6-45.2 14.4 78.3c1.8 9.8 9.5 17.5 19.3 19.3l78.3 14.4L402 242.4c-5.7 8.2-5.7 19 0 27.2l45.2 65.6-78.3 14.4c-9.8 1.8-17.5 9.5-19.3 19.3l-14.4 78.3L269.6 402c-8.2-5.7-19-5.7-27.2 0l-65.6 45.2-14.4-78.3c-1.8-9.8-9.5-17.5-19.3-19.3L64.8 335.2 110 269.6c5.7-8.2 5.7-19 0-27.2L64.8 176.8l78.3-14.4c9.8-1.8 17.5-9.5 19.3-19.3l14.4-78.3L242.4 110c8.2 5.7 19 5.7 27.2 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" fill='#fff' /></svg>
                                                )}
                                            </Button>
                                        </Nav>
                                        <Nav className="justify-content-end flex-grow-1 pe-3">

                                            {isLoginMode && (
                                                <Button variant="none"
                                                    onClick={() => {
                                                        setIsLoginMode(false);
                                                        localStorage.removeItem('token');
                                                    }
                                                    }>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={'22px'} viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                                                </Button>
                                            )}

                                            {isLoginMode &&
                                                <NavDropdown title={
                                                    <img className='profileImg' src={user.image && user.image.url} alt={user.image && user.image.alt} />
                                                }
                                                    id="navbarScrollingDropdown"
                                                    // Addinng a class for CSS to delete the arrow icon
                                                    className="no-arrow-dropdown"
                                                >
                                                    <NavDropdown.Item href="/editUserProphile">
                                                        Edit prophile
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item
                                                        href={user.image && user.image.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        View image prophile                                                    </NavDropdown.Item>
                                                </NavDropdown>
                                            }
                                        </Nav>

                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                            </Container>
                        </Navbar>
                    ))
                }

                {isVisibleNav && (<Button variant="none" onClick={() => setIsVisibleNav(false)}>
                    <svg className='upNavbar' enable-background="new 0 0 32 32" height="20px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z" fill="#666" /></svg>

                </Button>)

                }

                {!isVisibleNav && (
                    <Button variant="none" onClick={() => setIsVisibleNav(true)}>
                        <svg className='dowunNavbar' enable-background="new 0 0 32 32" height="25px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="25px" xmlns="http://www.w3.org/2000/svg" ><path d="M14.77,23.795L5.185,14.21c-0.879-0.879-0.879-2.317,0-3.195l0.8-0.801c0.877-0.878,2.316-0.878,3.194,0  l7.315,7.315l7.316-7.315c0.878-0.878,2.317-0.878,3.194,0l0.8,0.801c0.879,0.878,0.879,2.316,0,3.195l-9.587,9.585  c-0.471,0.472-1.104,0.682-1.723,0.647C15.875,24.477,15.243,24.267,14.77,23.795z" fill="#333" /></svg>
                        <br />
                        <br />
                    </Button>
                )}


                <Routes>
                    <Route path='/' element={<CardsPage isDark={isDark} />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<LogIn callback={isLoginFn} />} />
                    <Route path='/signUp' element={<SignUp />} />
                    <Route path='/myCards' element={<MyCards isDark={isDark} />} />
                    <Route path='/favCards' element={<FavCards isDark={isDark} />} />
                    <Route path='/results' element={<Results results={results} isDark={isDark} />} />
                    <Route path='/cardView' element={<CardView />} />
                    <Route path='/editUserProphile' element={<EditUserProphile />} />
                </Routes>


                <Nav className='footer'
                    style={{ background: !isDark ? '#222' : '#fff' }}
                    fill variant="tabs">
                    {/* Home */}
                    <Nav.Item >
                        <Nav.Link href="/" onClick={() =>
                            setUIFooterState(UI_ICONS_FOOTER_STATE.HOME)
                        } >
                            {homeIconFooter ?
                                (<svg xmlns="http://www.w3.org/2000/svg" width={'20px'} viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                                    fill={!isDark ? '#fff' : ''} /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width={'23px'} viewBox="0 0 24 24">
                                        <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
                                    </svg>
                                )}
                        </Nav.Link>
                    </Nav.Item>

                    {/* Fav Cards */}
                    {isLoginMode &&
                        <Nav.Item>
                            <Nav.Link href='/favCards'
                                onClick={() => {
                                    setUIFooterState(UI_ICONS_FOOTER_STATE.LIKE);
                                }} >
                                <svg xmlns="http://www.w3.org/2000/svg" width={'20px'} viewBox="0 0 512 512"><path d={likeIconFooter ? "M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" : "M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"}
                                    fill={!isDark ? '#fff' : ''}
                                /></svg>
                            </Nav.Link>
                        </Nav.Item>
                    }

                    {/* About */}
                    <Nav.Item >
                        <Nav.Link href='/about'
                            onClick={() =>
                                setUIFooterState(UI_ICONS_FOOTER_STATE.ABOUT)
                            }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" viewBox="0 0 50 50">
                                <path d={aboutIconFooter ? "M25,2C12.297,2,2,12.297,2,25s10.297,23,23,23s23-10.297,23-23S37.703,2,25,2z M25,11c1.657,0,3,1.343,3,3s-1.343,3-3,3 s-3-1.343-3-3S23.343,11,25,11z M29,38h-2h-4h-2v-2h2V23h-2v-2h2h4v2v13h2V38z" : "M 25 2 C 12.264481 2 2 12.264481 2 25 C 2 37.735519 12.264481 48 25 48 C 37.735519 48 48 37.735519 48 25 C 48 12.264481 37.735519 2 25 2 z M 25 4 C 36.664481 4 46 13.335519 46 25 C 46 36.664481 36.664481 46 25 46 C 13.335519 46 4 36.664481 4 25 C 4 13.335519 13.335519 4 25 4 z M 25 11 A 3 3 0 0 0 25 17 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 23 23 L 23 36 L 21 36 L 21 38 L 29 38 L 29 36 L 27 36 L 27 21 L 21 21 z"} fill={!isDark ? '#fff' : ''}></path>
                            </svg>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </BrowserRouter>
        </div >
    )
}

export default NavbarComp
