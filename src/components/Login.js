import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import loginImage from '../assets/loginIMG.png';
import Header from './Header';
import User from '../models/user';

const Login = ({ setUser, setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const successMessageRef = useRef(null);

  useEffect(() => {
    if (loginSuccess && successMessageRef.current) {
      successMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [loginSuccess]);

  console.log("API_URL: " + process.env.REACT_APP_API_BASE_URL);

  async function handleLogin(event) {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!email || !password) {
      setEmailError('Por favor, insira um e-mail.');
      setPasswordError('Por favor, insira uma senha.');
      return;
    }

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

    // faz login
    try {
      const res = await fetch(process.env.REACT_APP_API_BASE_URL + '/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 400) {
        setEmailError('E-mail não cadastrado.');
        setPasswordError('Senha incorreta.');
        setLoginSuccess(false);
        return;
      }

      const data = await res.json();

      if (data.error) {
        setEmailError('E-mail não cadastrado.');
        setPasswordError('Senha incorreta.');
        setLoginSuccess(false);
        return;
      }

      // salva o token
      setToken(data.token);

      const user = new User(data.user._id, data.user.name, data.user.surname, data.user.profilePic);
      setUser(user);

      setLoginSuccess(true);
      const errorElement = document.getElementById('error-message');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth' });
      }

      setTimeout(() => {
        window.scrollTo(0, 0);
        navigate('/homepage');
      }, 2000);

    } catch (err) {
      console.error(err);
      setLoginSuccess(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div className="login-container">
      <Header text="Login" />

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
          onKeyPress={handleKeyPress}
          style={{ borderRadius: '15px' }}
        />
        <p className="login-errorMessage">{passwordError}</p>
      </div>

      <div className="login-button" onClick={handleLogin}>
        <span className="login-buttonText">Entrar</span>
      </div>

      {loginSuccess && (
        <div ref={successMessageRef} className="login-successMessage">
          <br></br>
          Login realizado com sucesso!
          <br></br>
        </div>
        )}
    </div>
  );
};

export default Login;
