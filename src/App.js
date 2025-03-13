import React, { useState, useEffect } from 'react';

function App() {
  // Control de pantalla: "menu", "game", "results"
  const [screen, setScreen] = useState("menu");

  // Cantidad de ejercicios seleccionados (10, 20, 30)
  const [numberOfExercises, setNumberOfExercises] = useState(0);

  // Contador de ejercicios completados (aciertos)
  const [exercisesCompleted, setExercisesCompleted] = useState(0);

  // Estados para la multiplicación
  const [factor1, setFactor1] = useState(0);
  const [factor2, setFactor2] = useState(0);

  // Respuesta del usuario y mensaje de retroalimentación
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Puntaje (aciertos) y cantidad de intentos totales
  const [puntaje, setPuntaje] = useState(0);
  const [intentos, setIntentos] = useState(0);

  // Función para generar 2 números aleatorios (1..10)
  const generarMultiplicacion = () => {
    const f1 = Math.floor(Math.random() * 10) + 1;
    const f2 = Math.floor(Math.random() * 10) + 1;
    setFactor1(f1);
    setFactor2(f2);
    setRespuesta('');
    setMensaje('');
  };

  // Elección en el menú
  const iniciarJuego = (cantidad) => {
    setNumberOfExercises(cantidad);
    setExercisesCompleted(0);
    setPuntaje(0);
    setIntentos(0);
    setScreen("game");
  };

  // Verificar la respuesta al hacer clic en "Verificar"
  const verificarRespuesta = () => {
    const resultadoCorrecto = factor1 * factor2;
    const respNum = parseInt(respuesta, 10);

    // Contamos un intento
    setIntentos((prev) => prev + 1);

    if (isNaN(respNum)) {
      setMensaje('Por favor, ingresa un número válido.');
      return;
    }

    if (respNum === resultadoCorrecto) {
      // Acierto
      setPuntaje((prev) => prev + 1);
      setMensaje(`¡Correcto! ${factor1} x ${factor2} = ${resultadoCorrecto}`);

      // Sumar 1 al conteo de ejercicios completados
      setExercisesCompleted((prev) => {
        const nuevos = prev + 1;

        // Si alcanzó el total de ejercicios, vamos a la pantalla de resultados
        if (nuevos === numberOfExercises) {
          setScreen("results");
        }
        return nuevos;
      });

      // Generar la siguiente multiplicación (si aún no hemos terminado)
      setTimeout(() => {
        if (screen === "game") {
          generarMultiplicacion();
        }
      }, 800);

    } else {
      // Fallo: mostramos la respuesta correcta, pero seguimos en esta operación
      setMensaje(`Incorrecto. ${factor1} x ${factor2} = ${resultadoCorrecto}. ¡Intenta de nuevo!`);
    }
  };

  // Al cambiar a la pantalla de "game", generamos la primera multiplicación
  useEffect(() => {
    if (screen === "game") {
      generarMultiplicacion();
    }
    // eslint-disable-next-line
  }, [screen]);

  // Renderizado condicional según la pantalla
  if (screen === "menu") {
    return (
      <div style={{ fontFamily: 'Arial', margin: '20px' }}>
        <h1>¡Bienvenido a la Práctica de Multiplicación!</h1>
        <p>Elige cuántos ejercicios quieres resolver:</p>
        <button onClick={() => iniciarJuego(10)} style={{ marginRight: 10 }}>10</button>
        <button onClick={() => iniciarJuego(20)} style={{ marginRight: 10 }}>20</button>
        <button onClick={() => iniciarJuego(30)}>30</button>
      </div>
    );
  }

  if (screen === "game") {
    return (
      <div style={{ margin: '20px', maxWidth: '400px', fontFamily: 'Arial' }}>
        <h1 style={{ textAlign: 'center' }}>
          Ejercicio {exercisesCompleted + 1} de {numberOfExercises}
        </h1>

        <div style={{ background: '#f3f3f3', padding: '20px', borderRadius: '5px' }}>
          <p style={{ fontSize: '1.2em' }}>
            {factor1} x {factor2} = ?
          </p>

          <input
            type="number"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            style={{ width: '100px', fontSize: '1em', textAlign: 'center' }}
          />

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

  if (screen === "results") {
    return (
      <div style={{ fontFamily: 'Arial', margin: '20px' }}>
        <h1>¡Has terminado!</h1>
        <p>Ejercicios realizados: {numberOfExercises}</p>
        <p>Puntaje (aciertos): {puntaje}</p>
        <p>Intentos totales: {intentos}</p>

        <button
          onClick={() => {
            // Regresar al menú
            setScreen("menu");
            setNumberOfExercises(0);
            setExercisesCompleted(0);
            setPuntaje(0);
            setIntentos(0);
            setMensaje('');
            setRespuesta('');
          }}
        >
          Volver al Menú
        </button>
      </div>
    );
  }

  // Si por alguna razón no coincide ninguna opción
  return null;
}

export default App;
