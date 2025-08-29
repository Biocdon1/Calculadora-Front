import { useState } from 'react';
import Calculadora from './components/Calculadora';
import Ordenador from './components/Ordenador';

function App() {
  const [vista, setVista] = useState('menu'); // 'menu', 'calculadora', 'ordenador'

  const volverAlMenu = () => setVista('menu');

  return (
    <>
      {vista === 'menu' && (
        <div>
          <h1>Menú Principal</h1>
          <button onClick={() => setVista('calculadora')}>Calculadora</button>
          <button onClick={() => setVista('ordenador')}>Ordenador</button>
        </div>
      )}

      {vista === 'calculadora' && (
        <div>
          <Calculadora />
          <button onClick={volverAlMenu}>Volver al menú</button>
        </div>
      )}

      {vista === 'ordenador' && (
        <div>
          <Ordenador />
          <button onClick={volverAlMenu}>Volver al menú</button>
        </div>
      )}
    </>
  );
}

export default App;