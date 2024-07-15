import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cadastro.css';

const Cadastro = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordError2, setPasswordError2] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    setEmailError('');
    setPasswordError('');
    setPasswordError2('');

    // valida email
    if (!email.endsWith('@gmail.com') && !email.endsWith('@outlook.com')) {
      setEmailError('Por favor, insira um e-mail válido.');
      return;
    }

    // verifica senha
    if (password !== confirmPassword) {
      setPasswordError('As senhas não coincidem.');
      return;
    }

    if (password.length < 8) {
      setPasswordError2('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    // se estiver tudo correto
    if (firstName && lastName && email && password === confirmPassword) {
      setSignupSuccess(true);
      // aq add lógica pra enviar dados p servidor etc
      
      // vai pro login se tiver td certo
      navigate('/login');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="headerText">Cadastro</h1>
      </div>
      <p className="welcomeMessage">Vamos iniciar sua jornada PetHelp?</p>

      <div className="inputLabel">
        <p className="labelText">Qual é seu nome?</p>
        <input
          className="input"
          type="text"
          placeholder="Nome"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ borderRadius: '15px' }}
        />
      </div>

      <div className="inputLabel">
        <p className="labelText">Qual é seu sobrenome?</p>
        <input
          className="input"
          type="text"
          placeholder="Sobrenome"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ borderRadius: '15px' }}
        />
        <p className="infoMessage">*Seu nome e sobrenome poderão ser vistos por outros usuários.</p>
      </div>

      <div className="inputLabel">
        <p className="labelText">Qual é seu e-mail?</p>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ borderRadius: '15px' }}
        />
        <p className="errorMessage">{emailError}</p>
      </div>

      <div className="inputLabel">
        <p className="labelText">Escolha uma senha</p>
        <input
          className="input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ borderRadius: '15px' }}
        />
      </div>

      <div className="inputLabel">
        <p className="labelText">Confirme sua senha</p>
        <input
          className="input"
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ borderRadius: '15px' }}
        />
        <p className="errorMessage">{passwordError}</p>
        <p className="errorMessage">{passwordError2}</p>
      </div>

      <div className="button" onClick={handleSignup}>
        <span className="buttonText">Cadastrar</span>
      </div>

      {signupSuccess && <p className="successMessage">Cadastro realizado com sucesso!</p>}
    </div>
  );
};

export default Cadastro;
