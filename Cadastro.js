import React from 'react';
import './App.css';
import logo from './assets/logo.jpg';

function App() {
  return (
    <div className="container">
      <img src={logo} alt="SPC" />

      <div className="content">
        <p>
          Faça o login para ter acesso aos indicadores.
      </p>

        <form>
          <label htmlFor="usuario">USUÁRIO *</label>
          <input type="usuario" id="usuario" />

          <label htmlFOR="senha">SENHA *</label>
          <input type="senha" id="senha" />

          <button className="btn" type="submit"><strong>ACESSAR</strong></button>
        </form>

        <p>
          <strong>Primeiro acesso?</strong> Solicite o código de cadastro cadastro junto ao setor de RH.
      </p>

        <button className="btn" type="submit"><strong>CADASTRAR DADOS</strong></button>
      </div>
    </div>
  );
}

export default App;