const { useState, useEffect } = React;

const AppGlobal = () => {
  const [view, setView] = useState("none"); 
  const [isRegistering, setIsRegistering] = useState(false);
  const [userData, setUserData] = useState(null);

  // --- DATOS INTEGRALES (PROTEGIDOS) ---
  const estacionesL1 = [
    { nombre: "Portal de las Américas", tipo: "Terminal" }, { nombre: "Patio Taller", tipo: "Cocheras" },
    { nombre: "Villavicencio", tipo: "Intermedia" }, { nombre: "Av. Ciudad de Cali", tipo: "Intermedia" },
    { nombre: "Av. Boyacá", tipo: "Intermedia" }, { nombre: "Av. 68", tipo: "Intermedia" },
    { nombre: "Av. 50", tipo: "Intermedia" }, { nombre: "Av. NQS", tipo: "Interconexión" },
    { nombre: "Nariño", tipo: "Intermedia" }, { nombre: "Hortúa", tipo: "Intermedia" },
    { nombre: "Calle 1", tipo: "Intermedia" }, { nombre: "Calle 10", tipo: "Intermedia" },
    { nombre: "Calle 26", tipo: "Interconexión" }, { nombre: "Calle 45", tipo: "Intermedia" },
    { nombre: "Calle 63", tipo: "Intermedia" }, { nombre: "Calle 72", tipo: "Terminal Norte" }
  ];

  const puntosPersonalizacion = [
    { sitio: "CC Plaza de las Américas", dir: "Carrera 71D # 6-94 Sur", tel: "(601) 333-0000", horario: "8:00 AM - 7:00 PM" },
    { sitio: "Portal Norte", dir: "Autopista Norte - Calle 170", tel: "(601) 333-1111", horario: "5:00 AM - 10:00 PM" },
    { sitio: "Estación Calle 26", dir: "Avenida Caracas con Calle 26", tel: "(601) 333-2222", horario: "6:00 AM - 8:00 PM" },
    { sitio: "Portal 80", dir: "Calle 80 con Carrera 102", tel: "(601) 333-3333", horario: "5:00 AM - 10:00 PM" },
    { sitio: "Terminal Salitre", dir: "Diagonal 23 # 69-60", tel: "(601) 333-4444", horario: "7:00 AM - 6:00 PM" }
  ];

  const faqData = [
    { q: "¿Cuál es el horario del Metro?", a: "Operamos de 4:30 AM a 11:30 PM todos los días." },
    { q: "¿Cómo recargo mi tarjeta?", a: "En taquillas, máquinas automáticas o vía web." },
    { q: "¿Cuál es el costo del pasaje?", a: "La tarifa general es de $2,950 pesos colombianos." },
    { q: "¿Hay transbordos gratuitos?", a: "Sí, en una ventana de 110 minutos." },
    { q: "¿Los niños pagan pasaje?", a: "Niños menores de 3 años o 90cm viajan gratis." },
    { q: "¿Puedo llevar mascotas?", a: "Sí, en guacal y cumpliendo normas de convivencia." },
    { q: "¿Cómo reporto objetos perdidos?", a: "En la oficina de atención de la estación Calle 26." },
    { q: "¿Hay WiFi?", a: "Sí, gratuito en estaciones principales." },
    { q: "¿Puedo llevar mi bicicleta?", a: "Sí, en horarios valle y vagones señalizados." },
    { q: "¿Qué hago si mi tarjeta falla?", a: "Validación técnica en cualquier taquilla." },
    { q: "¿Hay tarifas para estudiantes?", a: "Sí, previa inscripción en el portal oficial." },
    { q: "¿Llega al Aeropuerto?", a: "Está proyectado para la fase 2 de la Línea 2." },
    { q: "¿Se puede comer en el tren?", a: "No, está prohibido por higiene y cultura." },
    { q: "¿Cuántas líneas tiene?", a: "Línea 1 en construcción avanzada y Línea 2 en licitación." },
    { q: "¿Hay asistencia de movilidad?", a: "Sí, todas las estaciones tienen ascensores." },
    { q: "¿Dónde está el mapa?", a: "En el botón 'Mapa Interactivo' de la pantalla principal." },
    { q: "¿Dónde compro la tarjeta?", a: "En cualquier taquilla del sistema Metro." },
    { q: "¿El saldo vence?", a: "No, el saldo no tiene fecha de expiración." },
    { q: "¿Cómo denuncio un robo?", a: "Use los botones de emergencia en el vagón o avise a la policía." },
    { q: "¿Hay biciparqueaderos?", a: "Sí, en todas las estaciones tipo Portal." }
  ];

  // --- LÓGICA DE SESIÓN ---
  const checkSession = () => {
    const session = localStorage.getItem('sessionActive');
    const savedUser = localStorage.getItem('userMEBOG');
    if (session === 'true' && savedUser) {
      const parsed = JSON.parse(savedUser);
      setUserData(parsed);
      return parsed;
    }
    setUserData(null);
    return null;
  };

  useEffect(() => {
    checkSession();
    const enlaces = document.querySelectorAll('.enlace_navegacion');
    
    // Configuración de navegación
    if (enlaces[0]) enlaces[0].onclick = () => setView("tarifas");
    if (enlaces[1]) enlaces[1].onclick = () => setView("personalizacion");
    if (enlaces[2]) enlaces[2].onclick = () => {
      if (checkSession()) setView("miTarjeta");
      else { alert("Inicia sesión para ver tu tarjeta."); setView("login"); }
    };
    if (enlaces[3]) enlaces[3].onclick = () => setView("lineas");
    
    // --- ACCESO A TIENDA (LIBRE SEGÚN TU SOLICITUD) ---
    const irTienda = () => { window.location.href = 'tienda.html'; };
    
    if (enlaces[4]) enlaces[4].onclick = irTienda; // Botón navegación Tienda
    document.getElementById('boton-carrito').onclick = irTienda; // Icono Carrito

    document.getElementById('boton-perfil').onclick = () => {
      if (checkSession()) setView("perfil"); 
      else setView("login");
    };
    document.getElementById('preguntas_frecuentes').onclick = () => setView("faq");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('logEmail').value;
    const pass = document.getElementById('logPass').value;
    const saved = JSON.parse(localStorage.getItem('userMEBOG'));
    if (saved && saved.email === email && saved.pass === pass) {
      localStorage.setItem('sessionActive', 'true');
      setUserData(saved);
      setView("none");
    } else alert("Credenciales incorrectas.");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      nombre: document.getElementById('regNombre').value,
      email: document.getElementById('regEmail').value,
      pass: document.getElementById('regPass').value,
      nTarjeta: "MEB-" + Math.floor(Math.random() * 900000 + 100000),
      saldo: 0
    };
    localStorage.setItem('userMEBOG', JSON.stringify(newUser));
    alert("¡Registro exitoso! Ya puedes iniciar sesión.");
    setIsRegistering(false);
  };

  if (view === "none") return null;

  return (
    <div style={styles.overlay}>
      <div style={{...styles.modal, width: (view === "login" || view === "perfil") ? "400px" : "750px"}}>
        <button onClick={() => {setView("none"); setIsRegistering(false);}} style={styles.closeBtn}>&times;</button>
        
        {/* VISTA: TARIFAS (DATOS COMPLETOS) */}
        {view === "tarifas" && (
          <div>
            <h2 style={{color: '#CA2C1B', marginBottom: '15px'}}>Tarifas y Planes</h2>
            <table style={styles.tabla}>
              <thead>
                <tr style={{background: '#f4f4f4'}}>
                  <th style={styles.th}>Categoría de Usuario</th>
                  <th style={styles.th}>Precio Pasaje</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={styles.td}>Adulto Mayor (65+ años)</td><td style={styles.td}>$1.500</td></tr>
                <tr><td style={styles.td}>Estudiantes (Primaria y Secundaria)</td><td style={styles.td}>$1.500</td></tr>
                <tr><td style={styles.td}>Personas en condición de Discapacidad</td><td style={styles.td}>$1.500</td></tr>
                <tr><td style={styles.td}>Policías y Militares (Uniformados)</td><td style={styles.td}>$1.500</td></tr>
                <tr><td style={styles.td}>Ciudadanos Nacionales (Tarjeta Personalizada)</td><td style={styles.td}>$3.000</td></tr>
                <tr><td style={styles.td}>Extranjeros y Tarjeta Básica</td><td style={styles.td}>$3.500</td></tr>
              </tbody>
            </table>
            <div style={styles.notaAzul}><b>Nota:</b> Domingos y Festivos gratuito de 8:00 AM a 4:00 PM.</div>
          </div>
        )}

        {/* VISTA: PERSONALIZACIÓN (DATOS COMPLETOS) */}
        {view === "personalizacion" && (
          <div>
            <h2 style={{color: '#CA2C1B', marginBottom: '15px'}}>Puntos de Personalización</h2>
            <table style={styles.tabla}>
              <thead>
                <tr style={{background: '#f4f4f4'}}>
                  <th style={styles.th}>Punto de Atención</th>
                  <th style={styles.th}>Dirección</th>
                  <th style={styles.th}>Teléfono</th>
                  <th style={styles.th}>Horario</th>
                </tr>
              </thead>
              <tbody>
                {puntosPersonalizacion.map((p, i) => (
                  <tr key={i}>
                    <td style={styles.td}><b>{p.sitio}</b></td>
                    <td style={styles.td}>{p.dir}</td>
                    <td style={styles.td}>{p.tel}</td>
                    <td style={styles.td}>{p.horario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* VISTA: LÍNEAS (16 ESTACIONES) */}
        {view === "lineas" && (
          <div>
            <h2 style={{color: '#CA2C1B', marginBottom: '20px'}}>Línea 1 - Estaciones</h2>
            <div style={styles.lineaContainer}>
                {estacionesL1.map((est, index) => (
                    <div key={index} style={styles.estacionItem}>
                        <div style={styles.indicadorContenedor}>
                            <div style={styles.circuloEstacion}></div>
                            {index !== estacionesL1.length - 1 && <div style={styles.lineaConectora}></div>}
                        </div>
                        <p style={styles.nombreEstacion}>{est.nombre}</p>
                    </div>
                ))}
            </div>
          </div>
        )}

        {/* VISTA: FAQ (20 PREGUNTAS) */}
        {view === "faq" && (
          <div style={{textAlign:'left'}}>
            <h2 style={{textAlign:'center', color:'#CA2C1B'}}>Preguntas Frecuentes</h2>
            {faqData.map((f, i) => (
              <details key={i} style={styles.faqDetail}><summary style={styles.faqSummary}>{f.q}</summary><div style={styles.faqAnswer}>{f.a}</div></details>
            ))}
          </div>
        )}

        {/* VISTA: MI TARJETA */}
        {view === "miTarjeta" && userData && (
          <div>
            <h2 style={{color: '#CA2C1B', marginBottom: '20px'}}>MI TARJETA MEBOG</h2>
            <div style={styles.digitalCard}>
                <div style={styles.cardHeader}><span>METRO BOGOTÁ</span><i className="fa-solid fa-train-subway"></i></div>
                <div style={styles.cardChip}></div>
                <p style={styles.cardLabel}>TITULAR</p>
                <p style={styles.cardText}>{userData.nombre.toUpperCase()}</p>
                <p style={styles.cardLabel}>SALDO DISPONIBLE</p>
                <p style={{...styles.cardText, color: '#F4E561', fontSize: '1.6rem'}}>${userData.saldo.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* VISTA: PERFIL / LOGIN / REGISTRO */}
        {view === "perfil" && userData && (
          <div style={{textAlign:'left'}}>
            <h2 style={{textAlign:'center', color: '#CA2C1B'}}>Mi Cuenta</h2>
            <div style={styles.cardInfo}>
              <p><b>Nombre:</b> {userData.nombre}</p>
              <p><b>Tarjeta:</b> {userData.nTarjeta}</p>
              <p><b>Saldo Actual:</b> ${userData.saldo.toLocaleString()}</p>
            </div>
            <button style={{...styles.submit, background:'#333'}} onClick={()=>{localStorage.setItem('sessionActive','false'); setView("none");}}>Cerrar Sesión</button>
          </div>
        )}

        {view === "login" && (
          <div>
            {!isRegistering ? (
              <form onSubmit={handleLogin}>
                <h2 style={{color: '#CA2C1B'}}>Iniciar Sesión</h2>
                <input type="email" id="logEmail" placeholder="Correo" required style={styles.input} />
                <input type="password" id="logPass" placeholder="Contraseña" required style={styles.input} />
                <button type="submit" style={styles.submit}>Ingresar</button>
                <p style={{marginTop:'15px', fontSize:'14px'}}>¿No tienes cuenta? <span style={styles.link} onClick={()=>setIsRegistering(true)}>Regístrate aquí</span></p>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <h2 style={{color: '#CA2C1B'}}>Crear Cuenta</h2>
                <input type="text" id="regNombre" placeholder="Nombre Completo" required style={styles.input} />
                <input type="email" id="regEmail" placeholder="Correo Electrónico" required style={styles.input} />
                <input type="password" id="regPass" placeholder="Contraseña" required style={styles.input} />
                <button type="submit" style={{...styles.submit, background:'#2ecc71'}}>Registrarme</button>
                <p style={{marginTop:'15px', fontSize:'14px'}}>¿Ya tienes cuenta? <span style={styles.link} onClick={()=>setIsRegistering(false)}>Inicia sesión</span></p>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
  modal: { background: 'white', padding: '30px', borderRadius: '25px', position: 'relative', textAlign: 'center', maxHeight: '85vh', overflowY: 'auto' },
  closeBtn: { position: 'absolute', top: '15px', right: '20px', border: 'none', background: 'none', fontSize: '30px', cursor: 'pointer' },
  input: { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '10px', border: '1px solid #ddd', boxSizing: 'border-box' },
  submit: { width: '100%', padding: '12px', background: '#CA2C1B', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' },
  link: { color: '#CA2C1B', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' },
  tabla: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  th: { padding: '12px', textAlign: 'left', borderBottom: '2px solid #CA2C1B', fontSize: '13px' },
  td: { padding: '12px', borderBottom: '1px solid #eee', textAlign: 'left', fontSize: '13px' },
  notaAzul: { background: '#e3f2fd', padding: '10px', borderRadius: '8px', marginTop: '15px', color: '#0d47a1', fontSize: '13px' },
  faqDetail: { borderBottom: '1px solid #eee', padding: '10px 0' },
  faqSummary: { fontWeight: 'bold', cursor: 'pointer' },
  faqAnswer: { padding: '10px', fontSize: '14px', color: '#555' },
  lineaContainer: { display: 'flex', flexDirection: 'column', paddingLeft: '40px' },
  estacionItem: { display: 'flex', height: '55px', alignItems: 'flex-start' },
  indicadorContenedor: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px', position: 'relative' },
  circuloEstacion: { width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#CA2C1B', border: '2px solid #F4E561', zIndex: 2 },
  lineaConectora: { width: '4px', height: '45px', backgroundColor: '#CA2C1B', position: 'absolute', top: '10px', zIndex: 1 },
  nombreEstacion: { fontSize: '15px', fontWeight: 'bold', margin: 0 },
  digitalCard: { background: 'linear-gradient(135deg, #1316D9 0%, #0d0f8a 100%)', borderRadius: '20px', padding: '25px', color: 'white', textAlign: 'left' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' },
  cardChip: { width: '50px', height: '35px', background: '#d4af37', borderRadius: '8px', marginBottom: '10px' },
  cardLabel: { fontSize: '0.6rem', color: '#ccc', margin: 0 },
  cardText: { fontSize: '1rem', fontWeight: 'bold', margin: '0 0 10px 0' },
  cardInfo: { background: '#f9f9f9', padding: '20px', borderRadius: '15px', border: '1px solid #eee' }
};

const root = ReactDOM.createRoot(document.getElementById('root-registro'));
root.render(<AppGlobal />);