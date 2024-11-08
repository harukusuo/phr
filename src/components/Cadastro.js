import React, { useState, useRef, useEffect } from 'react';
import '../styles/Cadastro.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import noUser from '../assets/noUser.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
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
      const res = await fetch(process.env.REACT_APP_API_BASE_URL + '/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: firstName,
          surname: lastName,
          email: email,
          password: password,
          profilePic: noUser
        }),
      });
      const data = await res.json();
      
      if (data.error !== undefined) {
        setEmailError('Este e-mail já está em uso.');
        return;
      }
      setSignupSuccess(true);
      if (successMessageRef.current) {
        successMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      
      setTimeout(() => {
        window.scrollTo(0, 0);
        navigate('/login');
      }, 2000); 
    } catch (err) {
      console.error(err);
      setSignupSuccess(false);
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

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
        <div className="cadastro-passwordContainer">
          <input
            className="cadastro-input"
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderRadius: '15px' }}
          />
          <span className="cadastro-passwordToggle" onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      <div className="cadastro-inputLabel">
        <p className="cadastro-labelText">Confirme sua senha</p>
        <div className="cadastro-passwordContainer">
          <input
            className="cadastro-input"
            type={confirmPasswordVisible ? 'text' : 'password'}
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ borderRadius: '15px' }}
          />
          <span className="cadastro-passwordToggle" onClick={toggleConfirmPasswordVisibility}>
            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
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