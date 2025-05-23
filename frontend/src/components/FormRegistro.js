// src/components/FormRegistro.js
import React, { useState } from 'react';
import axios from 'axios';

function FormRegistro() {
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [intervalo, setIntervalo] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/registros', {
      horaInicio,
      horaFim,
      intervalo: parseInt(intervalo)
    });
    alert('Registro salvo!');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-3">
        <label>Hora Início</label>
        <input type="datetime-local" className="form-control" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Hora Fim</label>
        <input type="datetime-local" className="form-control" value={horaFim} onChange={e => setHoraFim(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Intervalo (minutos)</label>
        <input type="number" className="form-control" value={intervalo} onChange={e => setIntervalo(e.target.value)} />
      </div>
      <button className="btn btn-primary">Salvar</button>
    </form>
  );
}

export default FormRegistro;
