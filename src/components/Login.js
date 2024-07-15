import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import loginImage from '../assets/loginIMG.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // valida email
    if (!email.endsWith('@gmail.com') && !email.endsWith('@outlook.com')) {
      setEmailError('Por favor, insira um e-mail válido.');
      return;
    } else {
      setEmailError('');
    }

    // valida senha
    if (password.length < 8) {
      setPasswordError('A senha deve ter pelo menos 8 caracteres.');
      return;
    } else {
      setPasswordError('');
    }

    // login bem sucedido
    if (email && password) {
      setLoginSuccess(true);
      navigate('/homepage');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="headerText">Login</h1>
      </div>
      
      <div className="welcomeMessage">Que bom te ver novamente!</div>

      <img src={loginImage} alt="Imagem de Bem-Vindo" className="welcomeImage" />

      <div className="inputLabel">
        <p className="labelText">Insira abaixo o seu e-mail:</p>
        <input
          className="input"
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ borderRadius: '15px' }}
        />
        <p className="errorMessage">{emailError}</p>
      </div>

      <div className="inputLabel">
        <p className="labelText">Insira abaixo a sua senha:</p>
        <input
          className="input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ borderRadius: '15px' }}
        />
        <p className="errorMessage">{passwordError}</p>
      </div>

      <div className="button" onClick={handleLogin}>
        <span className="buttonText">Entrar</span>
      </div>

      {loginSuccess && <p className="successMessage">Login bem-sucedido!</p>}
    </div>
  );
};

export default Login;
