import React, { useState } from 'react';
import api from '../../services/api';

export default function Cadastro({ history }) {

  const [colaborador, setColaborador] = useState('');
  const [setor, setSetor] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const resp = await api.post('/sessions', { colaborador });
    const respo = await api.post('/sessions', { setor });
    const respon = await api.post('/sessions', { senha });
    const respons = await api.post('/sessions', { confirmar });

    history.push('/indicadores');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="colaborador">Nome do Colaborador *</label>
        <input
          type="colaborador"
          id="colaborador"
          value={colaborador}
          onChange={event => setColaborador(event.target.value)}
        />

        <label htmlFor="setor">Setor *</label>
        <input
          type="setor"
          id="setor"
          value={setor}
          onChange={event => setSetor(event.target.value)}
        />

        <label htmlFor="senha">Senha *</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={event => setSenha(event.target.value)}
        />

        <label htmlFor="confirmar">Confirme a senha *</label>
        <input
          type="password"
          id="confirmar"
          value={confirmar}
          onChange={event => setConfirmar(event.target.value)}
        />

        <button className="btn" type="submit"><strong>CADASTRAR</strong></button>

        <p>
          Os campos marcados com * são de preenchimento obrigatório.
        </p>
      </form>
    </>
  )
}