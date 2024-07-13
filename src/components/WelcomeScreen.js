import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomeScreen.css';
import petHelpIcon from '../assets/pethelp_icone.png';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleLoginPress = () => {
    console.log('Botão Login pressionado');
    navigate('/login'); // Navegar para a tela de login
  };

  const handleCadastroPress = () => {
    console.log('Botão Cadastro pressionado');
    navigate('/cadastro'); // Navegar para a tela de cadastro
  };

  return (
    <div className="container">
      <img src={petHelpIcon} alt="PetHelp Logo" className="logo" />
      <p>Bem-vindo ao PetHelp!</p>
      <div className="button" onClick={handleLoginPress}>
        <span className="buttonText">Já possui uma conta? Clique e faça seu login</span>
      </div>
      <div className="button" onClick={handleCadastroPress}>
        <span className="buttonText">Clique aqui e crie uma conta agora mesmo!</span>
      </div>
    </div>
  );
};

export default WelcomeScreen;
