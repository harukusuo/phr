import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import homeIcon from '../assets/home.png';
import searchIcon from '../assets/buscar.png';
import chatsIcon from '../assets/chats.png';
import profileIcon from '../assets/perfil.png';
import postIcon from '../assets/postar.png';

const HomePage = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    console.log(`Botão ${buttonName} pressionado`);
  };

  const handleFloatingButtonClick = () => {
    setActiveButton('post');
    console.log('Botão Postar pressionado');
  };

  useEffect(() => {
    if (activeButton) {
      const timer = setTimeout(() => {
        setActiveButton(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [activeButton]);

  return (
    <div className="container">
      <div className="header">
        <h1 className="headerText">PetHelp</h1>
      </div>
      
      <div className="content">
        <p>Open up App.js to start working on your app!</p>
      </div>

      <div
        className={`floatingButton ${activeButton === 'post' ? 'active' : ''}`}
        onClick={handleFloatingButtonClick}
      >
        <img src={postIcon} alt="Postar" className="floatingButtonIcon" />
      </div>

      <div className="bottomBar">
        <div
          className={`button ${activeButton === 'home' ? 'active' : ''}`}
          onClick={() => handleButtonClick('home')}
        >
          <img src={homeIcon} alt="Home" className="icon" />
        </div>
        <div
          className={`button ${activeButton === 'search' ? 'active' : ''}`}
          onClick={() => handleButtonClick('search')}
        >
          <img src={searchIcon} alt="Pesquisar" className="icon" />
        </div>
        <div
          className={`button ${activeButton === 'chats' ? 'active' : ''}`}
          onClick={() => handleButtonClick('chats')}
        >
          <img src={chatsIcon} alt="Chats" className="icon" />
        </div>
        <div
          className={`button ${activeButton === 'profile' ? 'active' : ''}`}
          onClick={() => handleButtonClick('profile')}
        >
          <img src={profileIcon} alt="Meu Perfil" className="icon" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
