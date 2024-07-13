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

    // Validação do campo de e-mail
    if (!email.endsWith('@gmail.com') && !email.endsWith('@outlook.com')) {
      setEmailError('Por favor, insira um e-mail válido.');
      return;
    }

    // Verificação de senhas
    if (password !== confirmPassword) {
      setPasswordError('As senhas não coincidem.');
      return;
    }

    if (password.length < 8) {
      setPasswordError2('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    // Se todos os campos estiverem preenchidos corretamente
    if (firstName && lastName && email && password === confirmPassword) {
      setSignupSuccess(true);
      // Aqui você pode adicionar lógica para enviar os dados para o servidor ou fazer outras ações necessárias
      // Navega para a tela de login após o cadastro bem-sucedido
      navigate('/login');
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Cadastro</h1>
      <input
        className="input"
        type="text"
        placeholder="Nome"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Sobrenome"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className="errorMessage">{emailError}</p>
      <input
        className="input"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <p className="errorMessage">{passwordError}</p>
      <p className="errorMessage">{passwordError2}</p>
      <div className="button" onClick={handleSignup}>
        <span className="buttonText">Cadastrar</span>
      </div>
      {signupSuccess && <p className="successMessage">Cadastro realizado com sucesso!</p>}
    </div>
  );
};

export default Cadastro;
