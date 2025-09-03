import { useState } from 'react';
import '../styles/Ordenador.css'; 

function Ordenador() {
  const [numbers, setNumbers] = useState(['', '', '', '']);
  const [order, setOrder] = useState('asc');
  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (index, value) => {
    const nuevos = [...numbers];
    nuevos[index] = value;
    setNumbers(nuevos);
  };

  const ordenar = async () => {
    if (numbers.some(n => n === '')) {
      setError('Por favor llena los 4 campos.');
      return;
    }

    const payload = {
      numbers: numbers.map(Number),
      order
    };

    try {
      const res = await fetch('https://calculadora-end.vercel.app/v1/calculadora/ordenar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setResultado([]);
      } else {
        setResultado(data.ordenado);
        setError('');
      }
    } catch (err) {
      setError('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="container">
      <h1 id="txtOrdenador">ORDENADOR</h1>

      {numbers.map((num, i) => (
        <input
          key={i}
          type="number"
          className="number"
          value={num}
          onChange={(e) => handleChange(i, e.target.value)}
          placeholder={`Número ${i + 1}`}
        />
      ))}

      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>

      <button className="btnEnviar" onClick={ordenar}>Ordenar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {resultado.length > 0 && (
        <div>
          <h3>Resultado:</h3>
          <p>{resultado.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default Ordenador;