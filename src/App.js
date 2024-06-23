import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/cards/NavbarComp';
import APIContext from './contexts/APIContext';
import './components/style/NavbarComp.css'
import './App.css';
import { Container } from 'react-bootstrap';


function App() {

  // Check if it's Dark by using localStorage
  const getInitialDarkMode = () => {
    const savedMode = localStorage.getItem('isDark');
    // convert string to boolean
    console.log(savedMode);

    return savedMode === 'true';
  };

  // All page dark mode toggel 
  const [isDark, setIsDark] = useState(getInitialDarkMode);


  const toggleDarkMode = () => {
    setIsDark((prevMode) => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem('isDark', isDark);
  }, [isDark]);

  return (
    <div className="App">

      <APIContext.Provider value='https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards'>

        <Container
          className={`d-flex flex-column  align-items-center container
        ${isDark ? 'bg-dark text-light' : 'bg-light'}`}
          style={{ minHeight: '70vh' }} >


          <NavbarComp toggleDarkMode={toggleDarkMode} isDark={isDark} />


        </Container >

      </APIContext.Provider >

    </div >
  );
}

export default App;
