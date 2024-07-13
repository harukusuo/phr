import React from 'react';
import '../styles/HomePage.css';

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
          <span className="buttonText">Home</span>
        </div>
        <div className="button" onClick={() => console.log('Botão Pesquisar pressionado')}>
          <span className="buttonText">Pesquisar</span>
        </div>
        <div className="button" onClick={() => console.log('Botão Postar pressionado')}>
          <span className="buttonText">Postar</span>
        </div>
        <div className="button" onClick={() => console.log('Botão Chats pressionado')}>
          <span className="buttonText">Chats</span>
        </div>
        <div className="button" onClick={() => console.log('Botão Meu Perfil pressionado')}>
          <span className="buttonText">Meu Perfil</span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
