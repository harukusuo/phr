import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      setLoginSuccess(true);
      navigate('/homepage'); // Navegar para a HomePage após o login bem-sucedido
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Login</h1>
      <input
        className="input"
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="button" onClick={handleLogin}>
        <span className="buttonText">Entrar</span>
      </div>
      {loginSuccess && <p className="successMessage">Login bem-sucedido!</p>}
    </div>
  );
};

export default Login;
