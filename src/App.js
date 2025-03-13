import React, { useState, useEffect } from 'react';

function App() {
  const [factor1, setFactor1] = useState(0);
  const [factor2, setFactor2] = useState(0);
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [puntaje, setPuntaje] = useState(0);
  const [intentos, setIntentos] = useState(0);

  // Genera dos números aleatorios (1..10)
  const generarMultiplicacion = () => {
    const f1 = Math.floor(Math.random() * 10) + 1;
    const f2 = Math.floor(Math.random() * 10) + 1;
    setFactor1(f1);
    setFactor2(f2);
    setRespuesta('');
    setMensaje('');
  };

  // Verifica la respuesta del usuario
  const verificarRespuesta = () => {
    const resultadoCorrecto = factor1 * factor2;
    const respNum = parseInt(respuesta, 10);

    // Contar un intento cada vez que verifica
    setIntentos((prev) => prev + 1);

    if (isNaN(respNum)) {
      setMensaje('Por favor, ingresa un número válido.');
      return;
    }

    if (respNum === resultadoCorrecto) {
      setPuntaje((prev) => prev + 1);
      setMensaje(`¡Correcto! ${factor1} x ${factor2} = ${resultadoCorrecto}`);
      // Generar nueva multiplicación
      generarMultiplicacion();
    } else {
      // Muestra la operación correcta
      setMensaje(`Incorrecto. ${factor1} x ${factor2} = ${resultadoCorrecto}. ¡Intenta de nuevo!`);
    }
  };

  // Generar la primera multiplicación cuando carga la app
  useEffect(() => {
    generarMultiplicacion();
  }, []);

  return (
    <div style={{ margin: '20px', maxWidth: '400px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>Práctica de Multiplicación</h1>
      <div style={{ background: '#f3f3f3', padding: '20px', borderRadius: '5px' }}>
        <p style={{ fontSize: '1.2em' }}>
          {factor1} x {factor2} = ?
        </p>

        <input
          type="number"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          // Opción: verificar con Enter (por si funciona en algunos dispositivos)
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              verificarRespuesta();
            }
          }}
          style={{ width: '80px', fontSize: '1em', textAlign: 'center' }}
        />

        {/* Botón para verificar sin depender de Enter */}
        <div style={{ marginTop: '10px' }}>
          <button onClick={verificarRespuesta}>Verificar</button>
        </div>

        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{mensaje}</p>
        <p style={{ fontStyle: 'italic' }}>
          Aciertos: {puntaje} <br />
          Intentos: {intentos}
        </p>
      </div>
    </div>
  );
}

export default App;
