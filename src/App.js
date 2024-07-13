import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/Login';
import HomePage from './components/HomePage';
import Cadastro from './components/Cadastro';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={WelcomeScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/homepage" component={HomePage} />
          <Route path="/cadastro" component={Cadastro} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
