import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import loginImage from '../assets/loginIMG.png';
import Header from './Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    setEmailError('');
    setPasswordError('');

    // valida email
    if (!email.endsWith('@gmail.com') && !email.endsWith('@outlook.com') && !email.endsWith('@educar.rs.gov.br.com') && !email.endsWith('@yahoo.com') && !email.endsWith('@hotmail.com')) {
      setEmailError('Por favor, insira um e-mail válido.');
      return;
    }

    // valida senha
    if (password.length < 8) {
      setPasswordError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    // login bem-sucedido
    if (email && password) {
      setLoginSuccess(true);
      
      setTimeout(() => {
        navigate('/homepage');
      }, 2000);
    }
  };

  return (
    <div className="login-container">
      <Header text="Login"/>
      
      <div className="login-welcomeMessage">Que bom te ver novamente!</div>

      <img src={loginImage} alt="Imagem de Bem-Vindo" className="login-welcomeImage" />

      <div className="login-inputLabel">
        <p className="login-labelText">Insira abaixo o seu e-mail:</p>
        <input
          className="login-input"
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ borderRadius: '15px' }}
        />
        <p className="login-errorMessage">{emailError}</p>
      </div>

      <div className="login-inputLabel">
        <p className="login-labelText">Insira abaixo a sua senha:</p>
        <input
          className="login-input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ borderRadius: '15px' }}
        />
        <p className="login-errorMessage">{passwordError}</p>
      </div>

      <div className="login-button" onClick={handleLogin}>
        <span className="login-buttonText">Entrar</span>
      </div>

      {loginSuccess && <p className="login-successMessage">Login bem-sucedido!</p>}
      <hr></hr>
      <hr></hr>
    </div>
  );
};

export default Login;
