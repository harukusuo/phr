import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/Login';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import Cadastro from './components/Cadastro';
import Chats from './components/Chats';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Pets from './components/Pets';
import Perdidos from './components/Perdidos';
import Achados from './components/Achados';
import AddAnimal from './components/AddAnimal';
import NavBar from './components/NavBar';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);

    // useEffect para obter usuário e token do local storage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            console.log('Usuário obtido do local storage:', storedUser);
            console.log('Token obtido do local storage:', storedToken);
        }
        setUserLoaded(true);
    }, []);


    // useEffect para armazenar usuário e token no local storage
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token); 
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    return (
    <Router>
      <div className="App">
        <NavBar user={user} token={token} setUser={setUser} setToken={setToken} userLoaded={userLoaded} />
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen setUser={setUser} setToken={setToken}/>} />
          <Route path="/homepage" element={<HomePage user={user} token={token}/>} />
          <Route path="/search/:query?" element={<SearchPage user={user} token={token}/>} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/perdidos" element={<Perdidos user={user} token={token}/>} />
          <Route path="/achados" element={<Achados user={user} token={token}/>} />
          <Route path="/AddAnimal" element={<AddAnimal user={user}/>} />
          <Route path="/chats" element={<Chats user={user} token={token} />} />
          <Route path="/chat/:id" element={<Chat user={user} token={token} />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/profile/:id" element={<Profile user={user} token={token} setUser={setUser} setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
