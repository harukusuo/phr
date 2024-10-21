import React, { useState, useRef } from 'react';
import '../styles/Cadastro.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

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

    const defaultProfilePic = 'data:image/png;base64,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';
    
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
          profilePic: defaultProfilePic
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
        navigate('/login');
      }, 2000); 

    } catch (err) {
      console.error(err);
      setSignupSuccess(false);
    }
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
