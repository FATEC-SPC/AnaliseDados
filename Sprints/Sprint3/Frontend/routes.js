import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Indicadores from './pages/Indicadores';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Cadastro" component={Cadastro} />
        <Route path="/Indicadores" component={Indicadores} />
      </Switch>
    </BrowserRouter>
  );
}