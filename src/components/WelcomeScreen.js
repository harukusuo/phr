import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomeScreen.css';
import petHelpIcon from '../assets/pethelp_icone.png';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleLoginPress = () => {
    console.log('Botão Login pressionado');
    navigate('/login');
  };

  const handleCadastroPress = () => {
    console.log('Botão Cadastro pressionado');
    navigate('/cadastro');
  };

  return (
    <div className="welcomeContainer">
      <img src={petHelpIcon} alt="PetHelp Logo" className="logo" />
      <p className="titleText">Bem-vindo ao PetHelp!</p>
      
      {/*mensagem do cadastro*/}
      <p className="message">Primeira vez no site?</p>
      <div className="button" onClick={handleCadastroPress} style={{ borderRadius: '20px' }}>
        <span className="buttonText">Realizar cadastro</span>
      </div>
      
      {/*msg login*/}
      <p className="message">Já é um usuário do PetHelp?</p>
      <div className="button" onClick={handleLoginPress} style={{ borderRadius: '20px' }}>
        <span className="buttonText">Realizar login</span>
      </div>
    </div>
  );
};

export default WelcomeScreen;
