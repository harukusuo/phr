import React from 'react';
import '../styles/HomePage.css';
import homeIcon from '../assets/home.png';
import searchIcon from '../assets/buscar.png';
import chatsIcon from '../assets/chats.png';
import profileIcon from '../assets/perfil.png';
import postIcon from '../assets/postar.png';

const HomePage = () => {
  return (
    <div className="container">
      <div className="header">
        <h1 className="headerText">PetHelp</h1>
      </div>
      
      <div className="content">
        <p>Open up App.js to start working on your app!</p>
      </div>

      <div className="bottomBar">
        <div className="button" onClick={() => console.log('Botão Home pressionado')}>
          <img src={homeIcon} alt="Home" className="icon" />
        </div>
        <div className="button" onClick={() => console.log('Botão Pesquisar pressionado')}>
          <img src={searchIcon} alt="Pesquisar" className="icon" />
        </div>
        <div className="button" onClick={() => console.log('Botão Chats pressionado')}>
          <img src={chatsIcon} alt="Chats" className="icon" />
        </div>
        <div className="button" onClick={() => console.log('Botão Meu Perfil pressionado')}>
          <img src={profileIcon} alt="Meu Perfil" className="icon" />
        </div>
      </div>

      <div className="floatingButton" onClick={() => console.log('Botão Postar pressionado')}>
        <img src={postIcon} alt="Postar" className="floatingButtonIcon" />
      </div>
    </div>
  );
}

export default HomePage;
