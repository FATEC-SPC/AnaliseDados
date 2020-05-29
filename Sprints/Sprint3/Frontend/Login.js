import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Login({ history }) {

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/sessions', { usuario });
    const respond = await api.post('/sessions', { senha });

    history.push('/indicadores');
  }
  return (
    <>
      <p>
        Faça o login para ter acesso aos indicadores.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="usuario">USUÁRIO *</label>
        <input
          type="usuario"
          id="usuario"
          value={usuario}
          onChange={event => setUsuario(event.target.value)} />

        <label htmlFor="senha">SENHA *</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={event => setSenha(event.target.value)} />

        <button className="btn" type="submit"><strong>ACESSAR</strong></button>
      </form>

      <p>
        <strong>Primeiro acesso?</strong> Faça seu cadastro clicando no botão abaixo.
      </p>

      <Link to="/Cadastro">
        <button className="btn" type="submit"><strong>CADASTRAR DADOS</strong></button>
      </Link>
    </>
  )
}