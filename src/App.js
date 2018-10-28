import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Inicio from './Home/Inicio';
import Login from './Home/Login';
import Registrar from './Home/Registrar';
import Recuperar from './Home/Recuperar';
import ProjetosLista from './Projeto/ProjetosLista';
import Burndown from './Burndown/Burndown';
import Stories from './Projeto/Stories';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/' exact component={Inicio} />
          {/*<Route path='/login' component={Login} />
          <Route path='/registrar' component={Registrar} />
          <Route path='/recuperar' component={Recuperar} />*/}
          <Route path='/projetos' component={ProjetosLista} />
          <Route path='/burndown' component={Burndown} />
          {/*Os parâmetros passados pelas rotas chegam no componente através da propriedade params*/}
          <Route path='/kanban/:nome/:id' component={Stories} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
