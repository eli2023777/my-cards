import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/cards/NavbarComp';
import APIContext from './contexts/APIContext';
import './components/style/NavbarComp.css'
import './App.css';
import { Container } from 'react-bootstrap';






function App() {

  // All page dark mode toggel 
  const [isDarkPage, setisDarkPage] = useState(localStorage.getItem('isDark'));


  const toggleDarkMode = () => {
    setisDarkPage((prevMode) => !prevMode);
  };



  return (
    <div className="App">

      <APIContext.Provider value='https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards'>

        <Container
          className={`d-flex flex-column   align-items-center container
        ${!isDarkPage ? 'bg-dark text-light' : 'bg-light'}`}
          style={{ minHeight: '70vh' }} >


          <NavbarComp toggleDarkMode={toggleDarkMode} />


        </Container >

      </APIContext.Provider >

    </div >
  );
}

export default App;
