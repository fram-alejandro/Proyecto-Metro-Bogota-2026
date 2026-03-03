const { useState, useEffect, useRef } = React;

// --- 1. INYECCIÓN DE ESTILOS CSS ---
const style = document.createElement('style');
style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
  
  .graffiti-link { font-family: 'Permanent Marker', cursive !important; text-decoration: none !important; color: #333 !important; font-size: 1.1rem; transition: 0.3s; }
  .graffiti-link:hover { color: #CA2C1B !important; transform: translateX(5px); }

  .grid-estaciones { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px; }
  .estacion-card { background: #fff; border: 2px solid #333; border-radius: 20px; cursor: pointer; overflow: hidden; transition: 0.3s; text-align: center; }
  .estacion-card:hover { transform: scale(1.02); border-color: #CA2C1B; }
  
  .galeria-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px; margin: 20px 0; }
  .foto-placeholder { aspect-ratio: 1 / 1; background: #e0e0e0; border-radius: 15px; display: flex; align-items: center; justify-content: center; border: 2px dashed #999; color: #666; font-size: 0.7rem; text-align: center; padding: 10px; }

  .servicio-card { background: #f9f9f9; margin-bottom: 10px; border-radius: 15px; border: 1px solid #ddd; overflow: hidden; }
  .servicio-header { padding: 15px 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: bold; background: #fff; }
  .servicio-detalle { padding: 0 20px; max-height: 0; overflow: hidden; transition: 0.3s; background: #fff; }
  .servicio-card.open .servicio-detalle { max-height: 200px; padding: 15px 20px; border-top: 1px solid #eee; }

  .game-canvas { background: #1a1a1a; border: 8px solid #333; border-radius: 15px; display: block; margin: 0 auto; max-width: 100%; }
  .millonario-option { padding: 15px; border-radius: 10px; border: 2px solid #333; cursor: pointer; background: white; font-weight: bold; transition: 0.2s; }
  .millonario-option:hover { background: #eee; border-color: #CA2C1B; }

  .btn-ayuda { border: none; padding: 8px 12px; borderRadius: 8px; cursor: pointer; font-family: 'Permanent Marker'; font-size: 0.75rem; transition: 0.3s; color: white; }
  .btn-ayuda.active { background: #CA2C1B; }
  .btn-ayuda.disabled { background: #888 !important; cursor: not-allowed; opacity: 0.7; }

  /* Estilos Ahorcado */
  .ahorcado-letras { display: flex; flex-wrap: wrap; gap: 5px; justify-content: center; margin-top: 20px; }
  .btn-letra { width: 35px; height: 35px; border: 2px solid #333; background: white; font-family: 'Permanent Marker'; cursor: pointer; border-radius: 5px; }
  .btn-letra:disabled { background: #ddd; cursor: not-allowed; }
  .word-display { font-size: 2rem; letter-spacing: 10px; font-family: 'Permanent Marker'; margin: 20px 0; }
  .pista-box { background: #fef9c3; border: 1px solid #facc15; padding: 10px; border-radius: 10px; margin: 10px 0; font-size: 0.9rem; font-style: italic; }

  @media (max-width: 800px) { .grid-estaciones { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 500px) { .grid-estaciones { grid-template-columns: 1fr; } }
`;
document.head.appendChild(style);

const ExploraApp = () => {
  const [view, setView] = useState("menu");
  const [selectedEstacion, setSelectedEstacion] = useState(null);
  const [activeServicio, setActiveServicio] = useState(null);
  const [user] = useState(JSON.parse(localStorage.getItem('userMEBOG')) || { nombre: "Invitado", saldo: 0 });

  // --- COMPONENTE JUEGO 1: METRO-SNAKE ---
  const MetroSnake = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const resetGame = () => {
      setScore(0);
      setGameOver(false);
      setGameStarted(false);
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const box = 20;
      let snake = [{ x: 10 * box, y: 10 * box }, { x: 9 * box, y: 10 * box }];
      let food = { x: Math.floor(Math.random() * 19) * box, y: Math.floor(Math.random() * 19) * box };
      let d = "RIGHT";

      const direction = (e) => {
        if([37, 38, 39, 40].includes(e.keyCode) && !gameStarted && !gameOver) {
          setGameStarted(true);
        }

        if(e.keyCode == 37 && d != "RIGHT") d = "LEFT";
        else if(e.keyCode == 38 && d != "DOWN") d = "UP";
        else if(e.keyCode == 39 && d != "LEFT") d = "RIGHT";
        else if(e.keyCode == 40 && d != "UP") d = "DOWN";
      };
      document.addEventListener("keydown", direction);

      const drawStickman = (x, y) => {
        ctx.strokeStyle = "#F4E561"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(x + 10, y + 5, 4, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x + 10, y + 9); ctx.lineTo(x + 10, y + 15); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x + 5, y + 11); ctx.lineTo(x + 15, y + 11); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x + 10, y + 15); ctx.lineTo(x + 6, y + 19); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x + 10, y + 15); ctx.lineTo(x + 14, y + 19); ctx.stroke();
      };

      const draw = () => {
        if (!gameStarted || gameOver) {
          if (!gameStarted && !gameOver) {
            ctx.fillStyle = "#1a1a1a"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.font = "20px Permanent Marker";
            ctx.textAlign = "center";
            ctx.fillText("USA LAS FLECHAS PARA INICIAR", canvas.width/2, canvas.height/2);
          }
          return;
        }

        ctx.fillStyle = "#1a1a1a"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawStickman(food.x, food.y);
        for(let i = 0; i < snake.length; i++){
          ctx.fillStyle = (i == 0) ? "#CA2C1B" : "#e0e0e0";
          ctx.beginPath(); ctx.roundRect(snake[i].x + 1, snake[i].y + 1, box - 2, box - 2, 5); ctx.fill();
          if(i === 0) { ctx.fillStyle = "#87CEEB"; ctx.fillRect(snake[i].x + 12, snake[i].y + 5, 6, 10); }
        }
        let snakeX = snake[0].x; let snakeY = snake[0].y;
        if(d == "LEFT") snakeX -= box; if(d == "UP") snakeY -= box;
        if(d == "RIGHT") snakeX += box; if(d == "DOWN") snakeY += box;
        if(snakeX == food.x && snakeY == food.y){
          setScore(s => s + 10);
          food = { x: Math.floor(Math.random() * 19) * box, y: Math.floor(Math.random() * 19) * box };
        } else { snake.pop(); }
        let newHead = { x: snakeX, y: snakeY };
        if(snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || snake.some(s => s.x === newHead.x && s.y === newHead.y)){
          clearInterval(game); setGameOver(true);
        }
        snake.unshift(newHead);
      };
      let game = setInterval(draw, 120);
      return () => { clearInterval(game); document.removeEventListener("keydown", direction); };
    }, [gameStarted, gameOver]);

    return (
      <div style={{position: 'relative', textAlign: 'center'}}>
        <h3 style={graffitiTitle}>PASAJEROS: {score/10}</h3>
        <canvas ref={canvasRef} width="400" height="400" className="game-canvas"></canvas>
        {gameOver && (
          <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '20px', border: '3px solid #CA2C1B', zIndex: 10}}>
            <h2 style={graffitiTitle}>¡FIN DEL RECORRIDO!</h2>
            <p>Puntaje Final: <b>{score}</b></p>
            <button onClick={resetGame} style={btnBackStyle}>REINTENTAR</button>
          </div>
        )}
      </div>
    );
  };

  // --- COMPONENTE JUEGO 2: METRO-MILLONARIO ---
  const MetroMillonario = () => {
    const [etapa, setEtapa] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [msg, setMsg] = useState("");
    const [ayudas, setAyudas] = useState({ mitad: 1, pista: 1, cambio: 1 });
    const [ocultas, setOcultas] = useState([]);
    const [verPista, setVerPista] = useState(false);

    const bancoPreguntas = [
      { p: "¿Cuál es el color oficial del Metro?", r: ["Verde", "Rojo", "Azul", "Morado"], c: 0, h: "Esmeralda..." },
      { p: "¿Localidad del Patio Taller?", r: ["Kennedy", "Bosa", "Suba", "Fontibón"], c: 1, h: "Vecina de Kennedy." },
      { p: "¿Altura del viaducto?", r: ["5m", "13m", "25m", "2m"], c: 1, h: "Más de 10 metros." },
      { p: "¿Quién fundó Bogotá?", r: ["Bolívar", "Quesada", "Nariño", "Santander"], c: 1, h: "Gonzalo Jiménez de..." },
      { p: "¿Capacidad de un tren?", r: ["500", "1800", "5000", "100"], c: 1, h: "Casi 2000 personas." },
      { p: "¿Humedal más grande?", r: ["Burro", "Vaca", "Juan Amarillo", "Conejera"], c: 2, h: "Tibabuyes." },
      { p: "¿Nivel de automatización del Metro?", r: ["GoA1", "GoA2", "GoA4", "Manual"], c: 2, h: "Máxima autonomía." },
      { p: "¿Vagones por tren?", r: ["3", "6", "10", "12"], c: 1, h: "Media docena." },
      { p: "¿Avenida que recorrerá el viaducto?", r: ["Caracas", "Séptima", "Cali", "Autopista"], c: 0, h: "La troncal más vieja." },
      { p: "¿Año esperado de operación?", r: ["2024", "2028", "2030", "2025"], c: 1, h: "Faltan un par de años." },
    ];

    const [randomQ] = useState([...bancoPreguntas].sort(() => 0.5 - Math.random()).slice(0, 30));
    const actual = randomQ[etapa];

    const check = (i) => {
      if(i === actual.c) {
        setMsg("¡CORRECTO! +$100");
        setScore(s => s + 100);
        setTimeout(() => {
          if(etapa < randomQ.length - 1) { 
            setEtapa(e => e + 1); setMsg(""); setOcultas([]); setVerPista(false); 
          } else { setGameOver(true); }
        }, 1200);
      } else {
        setMsg("INCORRECTO ❌");
        setTimeout(() => setGameOver(true), 1200);
      }
    };

    const usar = (t) => {
      if(ayudas[t] <= 0) return; 
      
      setAyudas(prev => ({ ...prev, [t]: prev[t] - 1 }));
      if(t === 'mitad') setOcultas([0,1,2,3].filter(i => i !== actual.c).sort(() => 0.5-Math.random()).slice(0,2));
      if(t === 'pista') setVerPista(true);
      if(t === 'cambio') setEtapa(e => e + 1);
    };

    if(gameOver) return (
      <div style={{textAlign: 'center'}}>
        <h2 style={graffitiTitle}>PUNTAJE FINAL: ${score}</h2>
        <p>Nivel alcanzado: {Math.floor(etapa/3) + 1}</p>
        <button onClick={() => setView("juegos")} style={btnBackStyle}>SALIR</button>
      </div>
    );

    return (
      <div style={{textAlign: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem', fontWeight: 'bold'}}>
          <span>PREGUNTA: {etapa+1}/30</span>
          <span>NIVEL: {Math.floor(etapa/3) + 1}</span>
          <span>SALDO: ${score}</span>
        </div>
        <div style={{background: '#333', color: 'white', padding: '20px', borderRadius: '15px', marginBottom: '20px'}}>
          <p style={{fontSize: '1.1rem'}}>{actual.p}</p>
          {verPista && <p style={{color: '#F4E561', marginTop: '10px', fontSize: '0.9rem'}}>💡 PISTA: {actual.h}</p>}
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
          {actual.r.map((op, i) => !ocultas.includes(i) && (
            <button key={i} className="millonario-option" onClick={() => check(i)}>{op}</button>
          ))}
        </div>
        
        <div style={{marginTop: '25px', display: 'flex', gap: '8px', justifyContent: 'center'}}>
          <button 
            className={`btn-ayuda ${ayudas.mitad > 0 ? 'active' : 'disabled'}`} 
            onClick={() => usar('mitad')}
          >
            50/50 ({ayudas.mitad})
          </button>
          <button 
            className={`btn-ayuda ${ayudas.pista > 0 ? 'active' : 'disabled'}`} 
            onClick={() => usar('pista')}
          >
            PISTA ({ayudas.pista})
          </button>
          <button 
            className={`btn-ayuda ${ayudas.cambio > 0 ? 'active' : 'disabled'}`} 
            onClick={() => usar('cambio')}
          >
            CAMBIO ({ayudas.cambio})
          </button>
        </div>
        <p style={{marginTop: '15px', fontWeight: 'bold', minHeight: '24px'}}>{msg}</p>
      </div>
    );
  };

  // --- COMPONENTE JUEGO 3: METRO-AHORCADO ---
  const MetroAhorcado = () => {
    const bancoPalabras = [
      { w: "VIADUCTO", h1: "Estructura elevada por donde pasa el tren.", h2: "Sostiene los rieles sobre las avenidas." },
      { w: "ESTACION", h1: "Lugar donde suben y bajan los pasajeros.", h2: "Bogotá tendrá 16 en la primera línea." },
      { w: "VAGON", h1: "Cada una de las secciones del tren.", h2: "El metro tendrá trenes de 6 o 7 de estos." },
      { w: "RIEL", h1: "Barra metálica sobre la que ruedan las ruedas.", h2: "Guía el camino del tren." },
      { w: "BOGOTA", h1: "La ciudad donde se construye este sueño.", h2: "Capital de Colombia." },
      { w: "KENNEDY", h1: "Localidad donde inicia el viaducto.", h2: "Una de las zonas más pobladas del sur." },
      { w: "BOSA", h1: "Localidad donde queda el Patio Taller.", h2: "Extremo sur del proyecto." },
      { w: "CARACAS", h1: "Avenida principal que recorrerá el metro.", h2: "Troncal histórica de la ciudad." },
      { w: "METRO", h1: "Medio de transporte masivo pesado.", h2: "Sistema que estamos simulando aquí." },
      { w: "TRANSPORTE", h1: "Acción de llevar personas de un lado a otro.", h2: "Servicio público esencial." },
      { w: "PASAJERO", h1: "Persona que viaja en el sistema.", h2: "Tú serás uno de ellos muy pronto." },
      { w: "TARJETA", h1: "Medio de pago para ingresar.", h2: "Tullave es un ejemplo." },
      { w: "MOVILIDAD", h1: "Capacidad de desplazarse por la ciudad.", h2: "El gran reto de las grandes metrópolis." },
      { w: "ELECTRICO", h1: "Tipo de energía que mueve los trenes.", h2: "No usa combustibles fósiles." },
      { w: "COLUMNA", h1: "Soporte vertical del viaducto.", h2: "Miles de estas se están instalando hoy." },
      { w: "PILOTE", h1: "Cimentación profunda de las estructuras.", h2: "Se entierran a gran profundidad." },
      { w: "PATIO", h1: "Lugar de mantenimiento y parqueo.", h2: "Sección del sur donde 'duermen' los trenes." },
      { w: "TALLER", h1: "Donde se reparan los vagones.", h2: "Espacio técnico especializado." },
      { w: "URBANO", h1: "Perteneciente a la ciudad.", h2: "Lo opuesto a lo rural." },
      { w: "CIUDAD", h1: "Asentamiento humano grande.", h2: "Entorno donde opera el sistema." }
    ];

    const [indice, setIndice] = useState(0);
    const [letras, setLetras] = useState([]);
    const [errores, setErrores] = useState(0);
    const [completado, setCompletado] = useState(false);
    const [maxFinal, setMaxFinal] = useState(false);
    const [puntos, setPuntos] = useState(0);
    const [showH1, setShowH1] = useState(false);
    const [showH2, setShowH2] = useState(false);

    const actual = bancoPalabras[indice];
    const limiteErrores = 6;

    const presionarLetra = (l) => {
      if (letras.includes(l) || errores >= limiteErrores || completado) return;
      
      const nuevas = [...letras, l];
      setLetras(nuevas);

      if (!actual.w.includes(l)) {
        setErrores(errores + 1);
      } else {
        const victoria = actual.w.split('').every(char => nuevas.includes(char));
        if (victoria) {
          setCompletado(true);
          setPuntos(p => p + 50);
        }
      }
    };

    const irSiguiente = () => {
      if (indice === bancoPalabras.length - 1) {
        setMaxFinal(true);
      } else {
        setIndice(indice + 1);
        setLetras([]);
        setErrores(0);
        setCompletado(false);
        setShowH1(false);
        setShowH2(false);
      }
    };

    const resetTodo = () => {
      setIndice(0);
      setLetras([]);
      setErrores(0);
      setCompletado(false);
      setMaxFinal(false);
      setPuntos(0);
      setShowH1(false);
      setShowH2(false);
    };

    if (maxFinal) return (
      <div style={{textAlign: 'center'}}>
        <h1 style={graffitiTitleMain}>¡FELICIDADES!</h1>
        <h2 style={graffitiTitle}>MAXIMO PUNTAJE ALCANZADO: {puntos}</h2>
        <p>Dominas el vocabulario del Metro de Bogotá a la perfección.</p>
        <button onClick={resetTodo} style={btnBackStyle}>VOLVER A EMPEZAR</button>
      </div>
    );

    if (errores >= limiteErrores) return (
      <div style={{textAlign: 'center'}}>
        <h2 style={graffitiTitle}>¡TREN DESCARRILADO! (PERDISTE)</h2>
        <p style={{fontSize: '1.2rem', margin: '15px 0'}}>La respuesta correcta era: <b style={{color: '#CA2C1B', borderBottom: '2px solid'}}>{actual.w}</b></p>
        <p>Puntaje final: {puntos}</p>
        <button onClick={resetTodo} style={btnBackStyle}>INTENTAR DE NUEVO</button>
      </div>
    );

    return (
      <div style={{textAlign: 'center'}}>
        {/* Marcador de Nivel y Puntos */}
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontWeight: 'bold', fontSize: '1rem', background: '#333', color: 'white', padding: '10px', borderRadius: '10px'}}>
          <span>NIVEL: {indice + 1}/20</span>
          <span>ERRORES: {errores}/{limiteErrores}</span>
          <span>PUNTOS: {puntos}</span>
        </div>
        
        <div className="word-display">
          {actual.w.split('').map((char, i) => (
            <span key={i}>{letras.includes(char) ? char : "_"}</span>
          ))}
        </div>

        {/* Sección de Pistas */}
        <div style={{margin: '15px 0'}}>
          <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '10px'}}>
             <button onClick={() => setShowH1(true)} className="btn-ayuda active" disabled={showH1}>PISTA 1</button>
             <button onClick={() => setShowH2(true)} className="btn-ayuda active" disabled={showH2}>PISTA 2</button>
          </div>
          {showH1 && <div className="pista-box">💡 {actual.h1}</div>}
          {showH2 && <div className="pista-box">💡 {actual.h2}</div>}
        </div>

        <div className="ahorcado-letras">
          {"ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split('').map(l => (
            <button 
              key={l} 
              className="btn-letra"
              onClick={() => presionarLetra(l)}
              disabled={letras.includes(l) || completado}
              style={{borderColor: letras.includes(l) ? (actual.w.includes(l) ? 'green' : 'red') : '#333'}}
            >
              {l}
            </button>
          ))}
        </div>

        {completado && (
          <div style={{marginTop: '25px', background: '#dcfce7', padding: '15px', borderRadius: '15px', border: '2px solid green'}}>
            <h3 style={{color: 'green', margin: 0}}>¡EXCELENTE TRABAJO! +50 PTS</h3>
            <button onClick={irSiguiente} style={btnBackStyle}>SIGUIENTE NIVEL</button>
          </div>
        )}
      </div>
    );
  };

  // --- DATOS ESTACIONES ---
  const estacionesMetro = [
    { id: 1, n: "Portal Américas" }, { id: 2, n: "Patio Taller" }, { id: 3, n: "Av. Villavicencio" },
    { id: 4, n: "Av. Ciudad de Cali" }, { id: 5, n: "Av. Boyacá" }, { id: 6, n: "Avenida 68" },
    { id: 7, n: "Avenida 50" }, { id: 8, n: "Avenida NQS" }, { id: 9, n: "Nariño" },
    { id: 10, n: "Calle 1" }, { id: 11, n: "Calle 10" }, { id: 12, n: "Calle 26" },
    { id: 13, n: "Calle 45" }, { id: 14, n: "Calle 63" }, { id: 15, n: "Calle 72" }
  ];

  const sitiosOcio = Array.from({ length: 60 }, (_, i) => ({
    n: `Sitio de Interés ${i + 1}`,
    url: "#",
    est: estacionesMetro[i % estacionesMetro.length].n
  }));

  const serviciosEstacion = [
    { n: "Ascensores de alta capacidad", icon: "fa-elevator", d: "Sistemas panorámicos con prioridad para movilidad reducida." },
    { n: "Cafeterías y Snacks", icon: "fa-mug-hot", d: "Zonas comerciales y máquinas expendedoras." },
    { n: "Personalización de Tarjeta", icon: "fa-id-card", d: "Oficinas para registro y recuperación de saldo." }
  ];

  const renderContent = () => {
    switch(view) {
      case "ocio": return (
        <div style={panelStyle}>
          <h1 style={graffitiTitleMain}>RUTA DE OCIO</h1>
          <div style={scrollStyle}>
            {sitiosOcio.map((s, i) => (
              <div key={i} style={{padding: '10px 0', borderBottom: '1px solid #eee'}}>
                <a href={s.url} className="graffiti-link">{s.n.toUpperCase()}</a>
                <br/><small>CERCA DE: {s.est}</small>
              </div>
            ))}
          </div>
          <button onClick={() => setView("menu")} style={btnBackStyle}>VOLVER</button>
        </div>
      );
      case "servicios": return (
        <div style={panelStyle}>
          <h1 style={graffitiTitleMain}>SERVICIOS</h1>
          {serviciosEstacion.map((ser, i) => (
            <div key={i} className={`servicio-card ${activeServicio === i ? 'open' : ''}`}>
              <div className="servicio-header" onClick={() => setActiveServicio(activeServicio === i ? null : i)}>
                <span>{ser.n}</span><i className="fa-solid fa-chevron-down"></i>
              </div>
              <div className="servicio-detalle">{ser.d}</div>
            </div>
          ))}
          <button onClick={() => setView("menu")} style={btnBackStyle}>VOLVER</button>
        </div>
      );
      case "estaciones": return (
        <div style={panelStyle}>
          {selectedEstacion ? (
            <div>
              <h1 style={graffitiTitleMain}>{selectedEstacion.n.toUpperCase()}</h1>
              <div className="galeria-container">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="foto-placeholder"><span>Portal {num}<br/>{selectedEstacion.n}</span></div>
                ))}
              </div>
              <button onClick={() => setSelectedEstacion(null)} style={btnBackStyle}>VOLVER AL LISTADO</button>
            </div>
          ) : (
            <div>
              <h1 style={graffitiTitleMain}>ESTACIONES</h1>
              <div className="grid-estaciones">
                {estacionesMetro.map(e => (
                  <div key={e.id} className="estacion-card" onClick={() => setSelectedEstacion(e)}>
                    <div style={{padding: '20px', background: '#eee'}}><i className="fa-solid fa-train-subway"></i></div>
                    <div style={{padding: '10px', fontSize: '0.8rem'}}>{e.n.toUpperCase()}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setView("menu")} style={btnBackStyle}>VOLVER AL MENÚ</button>
            </div>
          )}
        </div>
      );
      case "juegos": return (
        <div style={panelStyle}>
          <h1 style={graffitiTitleMain}>MEBOG GAMES</h1>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
            <div className="estacion-card" onClick={() => setView("game-snake")} style={{padding: '20px'}}>
              <i className="fa-solid fa-train" style={iconStyle}></i>
              <h3 style={graffitiTitle}>METRO-SNAKE</h3>
            </div>
            <div className="estacion-card" onClick={() => setView("game-millonario")} style={{padding: '20px'}}>
              <i className="fa-solid fa-sack-dollar" style={iconStyle}></i>
              <h3 style={graffitiTitle}>MILLONARIO</h3>
            </div>
            <div className="estacion-card" onClick={() => setView("game-ahorcado")} style={{padding: '20px'}}>
              <i className="fa-solid fa-font" style={iconStyle}></i>
              <h3 style={graffitiTitle}>AHORCADO</h3>
            </div>
          </div>
          <button onClick={() => setView("menu")} style={btnBackStyle}>VOLVER AL MENÚ</button>
        </div>
      );
      case "game-snake": return (
        <div style={panelStyle}>
          <h1 style={graffitiTitleMain}>METRO-SNAKE</h1>
          <MetroSnake />
          <button onClick={() => setView("juegos")} style={btnBackStyle}>SALIR</button>
        </div>
      );
      case "game-millonario": return (
        <div style={panelStyle}>
          <h1 style={graffitiTitleMain}>METRO-MILLONARIO</h1>
          <MetroMillonario />
          <button onClick={() => setView("juegos")} style={btnBackStyle}>SALIR</button>
        </div>
      );
      case "game-ahorcado": return (
        <div style={panelStyle}>
          <h1 style={graffitiTitleMain}>METRO-AHORCADO</h1>
          <MetroAhorcado />
          <button onClick={() => setView("juegos")} style={btnBackStyle}>SALIR</button>
        </div>
      );
      default: return (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px'}}>
          <div style={cardStyle} onClick={() => setView("ocio")}><i className="fa-solid fa-camera-retro" style={iconStyle}></i><h2 style={graffitiTitle}>OCIO</h2></div>
          <div style={cardStyle} onClick={() => setView("servicios")}><i className="fa-solid fa-bell-concierge" style={iconStyle}></i><h2 style={graffitiTitle}>SERVICIOS</h2></div>
          <div style={cardStyle} onClick={() => setView("estaciones")}><i className="fa-solid fa-map-pin" style={iconStyle}></i><h2 style={graffitiTitle}>ESTACIONES</h2></div>
          <div style={cardStyle} onClick={() => setView("juegos")}><i className="fa-solid fa-gamepad" style={iconStyle}></i><h2 style={graffitiTitle}>JUEGOS</h2></div>
        </div>
      );
    }
  };

  return (
    <div style={{minHeight: '100vh', background: '#f4f4f4', paddingBottom: '40px'}}>
      <header style={headerStyle}>
        <h1 style={{fontFamily: 'Permanent Marker', cursor: 'pointer', margin: 0}} onClick={() => setView("menu")}>MEBOG EXPLORA</h1>
        <div style={{textAlign: 'right'}}>
          <span>{user.nombre}</span><br/><b style={{color: '#F4E561'}}>${user.saldo.toLocaleString()}</b>
        </div>
      </header>
      <div style={{padding: '20px'}}>{renderContent()}</div>
    </div>
  );
};

// --- ESTILOS COMPONENTES ---
const headerStyle = { background: '#333', color: 'white', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #CA2C1B' };
const cardStyle = { background: 'white', padding: '30px', borderRadius: '25px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' };
const iconStyle = { fontSize: '2.5rem', color: '#CA2C1B' };
const graffitiTitle = { fontFamily: 'Permanent Marker', marginTop: '10px' };
const graffitiTitleMain = { fontFamily: 'Permanent Marker', color: '#CA2C1B', textAlign: 'center' };
const panelStyle = { background: 'white', padding: '30px', borderRadius: '30px', maxWidth: '800px', margin: '0 auto', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' };
const scrollStyle = { maxHeight: '50vh', overflowY: 'auto', padding: '10px' };
const btnBackStyle = { marginTop: '20px', padding: '10px 25px', background: '#333', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', fontFamily: 'Permanent Marker' };

const root = ReactDOM.createRoot(document.getElementById('root-explora'));
root.render(<ExploraApp />);