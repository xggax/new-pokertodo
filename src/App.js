import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Inicio from './Home/Inicio';
import Login from './Home/Login';
import Registrar from './Home/Registrar';
import Recuperar from './Home/Recuperar';
import ProjetosLista from './Projeto/ProjetosLista';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/' exact component={Inicio} />
          <Route path='/login' component={Login} />
          <Route path='/registrar' component={Registrar} />
          <Route path='/recuperar' component={Recuperar} />
          <Route path='/projetos' component={ProjetosLista} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
