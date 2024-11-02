import React, { useState, useRef, useEffect } from 'react';
import '../styles/Cadastro.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import noUser from '../assets/noUser.png';

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
  const successMessageRef = useRef(null);

  useEffect(() => {
    if (signupSuccess && successMessageRef.current) {
      successMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [signupSuccess]);

  async function handleSignup() {
    setEmailError('');
    setPasswordError('');
    setPasswordError2('');
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setEmailError('Por favor, preencha todos os campos.');
      return;
    }
    if (!email.endsWith('@gmail.com') && !email.endsWith('@outlook.com') && !email.endsWith('@educar.rs.gov.br.com') && !email.endsWith('@yahoo.com') && !email.endsWith('@hotmail.com')) {
      setEmailError('Por favor, insira um e-mail válido.');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('As senhas não coincidem.');
      return;
    }
    if (password.length < 8) {
      setPasswordError2('A senha deve ter no mínimo 8 caracteres.');
      return;
    }
    
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: firstName,
          surname: lastName,
          email: email,
          password: password,
          profilePicture: noUser
        }),
      });
      const data = await res.json();
      
      if (data.error !== undefined) {
        setEmailError('Este e-mail já está em uso.');
        return;
      }
      setSignupSuccess(true);
      successMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      
      setTimeout(() => {
        window.scrollTo(0, 0);
        navigate('/login');
      }, 2000); 
    } catch (err) {
      console.error(err);
      setSignupSuccess(false);
    }
  }

  return (
    <div className="cadastro">
      <Header text="Cadastro" />
      
      <p className="cadastro-welcomeMessage">Vamos iniciar sua jornada PetHelp?</p>

      <div className="cadastro-inputLabel">
        <p className="cadastro-labelText">Qual é seu nome?</p>
        <input
          className="cadastro-input"
          type="text"
          placeholder="Nome"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ borderRadius: '15px' }}
        />
      </div>

      <div className="cadastro-inputLabel">
        <p className="cadastro-labelText">Qual é seu sobrenome?</p>
        <input
          className="cadastro-input"
          type="text"
          placeholder="Sobrenome"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ borderRadius: '15px' }}
        />
        <p className="cadastro-infoMessage">*Seu nome e sobrenome poderão ser vistos por outros usuários.</p>
      </div>

      <div className="cadastro-inputLabel">
        <p className="cadastro-labelText">Qual é seu e-mail?</p>
        <input
          className="cadastro-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ borderRadius: '15px' }}
        />
        <p className="cadastro-errorMessage">{emailError}</p>
      </div>

      <div className="cadastro-inputLabel">
        <p className="cadastro-labelText">Escolha uma senha</p>
        <input
          className="cadastro-input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ borderRadius: '15px' }}
        />
      </div>

      <div className="cadastro-inputLabel">
        <p className="cadastro-labelText">Confirme sua senha</p>
        <input
          className="cadastro-input"
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ borderRadius: '15px' }}
        />
        <p className="cadastro-errorMessage">{passwordError}</p>
        <p className="cadastro-errorMessage">{passwordError2}</p>
      </div>

      <div className="cadastro-button" onClick={handleSignup}>
        <span className="cadastro-buttonText">Cadastrar</span>
      </div>

      {signupSuccess && (
        <div ref={successMessageRef} className="cadastro-successMessage">
          <br></br>
          Cadastro realizado com sucesso!
          <br></br>
        </div>
      )}
    </div>
  );
};

export default Cadastro;