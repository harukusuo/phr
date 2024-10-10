import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <Router basename="/phr">
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/search/:query?" element={<SearchPage />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/perdidos" element={<Perdidos />} />
          <Route path="/achados" element={<Achados />} />
          <Route path="/AddAnimal" element={<AddAnimal />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
