import React, { useState, useEffect } from 'react';
import './App.css'; // Importamos el archivo de estilos

function App() {
  // Control de pantallas: "menu", "game" o "results"
  const [screen, setScreen] = useState("menu");

  // Cuántos ejercicios quiere hacer el usuario: 10, 20 o 30
  const [numberOfExercises, setNumberOfExercises] = useState(0);

  // Cuántos ejercicios se han completado (incrementa solo si la respuesta es correcta)
  const [exercisesCompleted, setExercisesCompleted] = useState(0);

  // Factores de la multiplicación
  const [factor1, setFactor1] = useState(0);
  const [factor2, setFactor2] = useState(0);

  // Respuesta del usuario y mensaje de retroalimentación
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Puntaje (aciertos) y cantidad de intentos
  const [puntaje, setPuntaje] = useState(0);
  const [intentos, setIntentos] = useState(0);

  // Generar 2 números aleatorios entre 1..10 (puedes cambiar a 1..12 si quieres)
  const generarMultiplicacion = () => {
    const f1 = Math.floor(Math.random() * 10) + 1;
    const f2 = Math.floor(Math.random() * 10) + 1;
    setFactor1(f1);
    setFactor2(f2);
    setRespuesta('');
    setMensaje('');
  };

  // Cuando el usuario elige 10, 20 o 30 ejercicios:
  const iniciarJuego = (cantidad) => {
    setNumberOfExercises(cantidad);
    setExercisesCompleted(0);
    setPuntaje(0);
    setIntentos(0);
    setScreen("game");
  };

  // Verificar la respuesta al presionar Enter
  const verificarRespuesta = () => {
    const resultadoCorrecto = factor1 * factor2;
    const respNum = parseInt(respuesta, 10);

    if (isNaN(respNum)) {
      setMensaje('Por favor, ingresa un número válido.');
      return;
    }

    // Contamos un intento más (acierto o fallo)
    setIntentos((prev) => prev + 1);

    if (respNum === resultadoCorrecto) {
      // Acierta
      setPuntaje((prev) => prev + 1);
      setMensaje(`¡Correcto! ${factor1} x ${factor2} = ${resultadoCorrecto}`);

      // Incrementar ejercicios completados
      setExercisesCompleted((prev) => {
        const nuevos = prev + 1;
        // Si llegó al total, pasamos a pantalla de resultados
        if (nuevos === numberOfExercises) {
          setScreen("results");
        }
        return nuevos;
      });

      // Generar la siguiente multiplicación si todavía quedan ejercicios
      setTimeout(() => {
        // Solo generamos si sigue en "game" (no se pasó a "results")
        if (screen === "game") {
          generarMultiplicacion();
        }
      }, 800);

    } else {
      // Falla
      setMensaje(`Incorrecto. ${factor1} x ${factor2} = ${resultadoCorrecto}. ¡Intenta de nuevo!`);
    }
  };

  // Cada vez que entremos a la pantalla "game", generamos una multiplicación
  useEffect(() => {
    if (screen === "game") {
      generarMultiplicacion();
    }
  }, [screen]);

  // Renderizado condicional según la pantalla
  if (screen === "menu") {
    return (
      <div className="container">
        <h1>¡Bienvenido!</h1>
        <p>¿Cuántos ejercicios quieres realizar?</p>
        <div className="buttons-row">
          <button onClick={() => iniciarJuego(10)}>10</button>
          <button onClick={() => iniciarJuego(20)}>20</button>
          <button onClick={() => iniciarJuego(30)}>30</button>
        </div>
      </div>
    );
  }

  if (screen === "game") {
    return (
      <div className="container">
        <h1>
          Ejercicio {exercisesCompleted + 1} de {numberOfExercises}
        </h1>
        <div className="card">
          <p className="operation">
            {factor1} x {factor2} = ?
          </p>
          <input
            type="number"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                verificarRespuesta();
              }
            }}
            className="answer-input"
          />
          <p className="message">{mensaje}</p>
          <p className="stats">
            Aciertos: {puntaje} <br />
            Intentos: {intentos}
          </p>
        </div>
      </div>
    );
  }

  if (screen === "results") {
    return (
      <div className="container">
        <h1>¡Has terminado!</h1>
        <p>Ejercicios realizados: {numberOfExercises}</p>
        <p>Puntaje (aciertos): {puntaje}</p>
        <p>Intentos totales: {intentos}</p>
        <button
          onClick={() => {
            // Volver al menú (reiniciamos también, por si acaso)
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

  // Si por alguna razón no coincide ninguna pantalla
  return null;
}

export default App;
