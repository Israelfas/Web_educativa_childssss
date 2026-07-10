/* Estilos del modulo de Lengua con IA — DrawTale Edu.
   Direccion: "cuaderno magico de aventuras" — una bitacora de bosque donde
   los dibujos de los ninos se prenden con washi tape y cobran vida como cuento. */

@import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,600&family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap");

:root {
  color-scheme: light;

  /* Estructura — bosque */
  --bosque: #1b4332;
  --bosque-osc: #0f2a1e;
  --bosque-luz: #3a6b4f;
  --bosque-tenue: #e3efe6;

  /* Magia — dorado (pistas, tooltips, pregunta) */
  --dorado: #d4a017;
  --dorado-claro: #f2c94c;
  --dorado-tenue: #fef3d2;

  /* Firma — coral (washi tape, accion principal) */
  --coral: #e8674f;
  --coral-osc: #cf4f38;
  --coral-tenue: #fde2da;

  --rojo: #b91c1c;
  --tinta: #1c2a24;
  --gris: #6b7a72;
  --borde: #e6dcc0;
  --pergamino: #faf3e2;
  --tarjeta: #fffdf8;
  --sombra: 0 14px 34px rgba(15, 42, 30, 0.12);
  --sombra-suave: 0 4px 14px rgba(15, 42, 30, 0.08);
  --radio: 18px;

  --fuente-titulo: "Fraunces", Georgia, serif;
  --fuente-ui: "Baloo 2", system-ui, -apple-system, sans-serif;
  --fuente-texto: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--fuente-texto);
  color: var(--tinta);
  background:
    radial-gradient(2px 2px at 8% 12%, rgba(212, 160, 23, 0.35) 0, transparent 60%),
    radial-gradient(2px 2px at 22% 68%, rgba(27, 67, 50, 0.25) 0, transparent 60%),
    radial-gradient(2px 2px at 78% 22%, rgba(232, 103, 79, 0.3) 0, transparent 60%),
    radial-gradient(2px 2px at 92% 78%, rgba(212, 160, 23, 0.3) 0, transparent 60%),
    radial-gradient(2px 2px at 45% 88%, rgba(27, 67, 50, 0.2) 0, transparent 60%),
    radial-gradient(1200px 550px at 105% -8%, #fef3c7 0, transparent 60%),
    radial-gradient(950px 450px at -12% 4%, #d9f0e2 0, transparent 55%),
    var(--pergamino);
  min-height: 100vh;
}

.app {
  max-width: 1080px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3.5rem;
}

/* Cabecera ---------------------------------------------------------------- */
.app__header {
  position: relative;
  text-align: center;
  margin-bottom: 1.75rem;
  padding: 0.5rem 0 1rem;
}

.app__header::before,
.app__header::after {
  content: "✦";
  position: absolute;
  color: var(--dorado);
  font-size: 1.1rem;
  opacity: 0.7;
  animation: centellear 2.6s ease-in-out infinite;
}

.app__header::before {
  top: 6px;
  left: 14%;
  animation-delay: 0.4s;
}

.app__header::after {
  top: 22px;
  right: 16%;
  font-size: 0.85rem;
  animation-delay: 1.1s;
}

@keyframes centellear {
  0%, 100% { opacity: 0.25; transform: scale(0.85); }
  50% { opacity: 0.9; transform: scale(1.15); }
}

.app__kicker {
  display: inline-block;
  margin: 0;
  font-family: var(--fuente-ui);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: var(--bosque-osc);
  background: var(--dorado-claro);
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  transform: rotate(-2deg);
  box-shadow: var(--sombra-suave);
}

.app__titulo {
  margin: 0.6rem 0 0.35rem;
  font-size: clamp(2rem, 5.5vw, 3rem);
  font-family: var(--fuente-titulo);
  font-style: italic;
  font-weight: 600;
  color: var(--bosque-osc);
}

.app__sub {
  margin: 0 auto;
  max-width: 34ch;
  color: var(--gris);
  font-family: var(--fuente-ui);
  font-weight: 500;
}

/* Navbar -------------------------------------------------------------- */
.navbar {
  display: flex;
  gap: 0.3rem;
  justify-content: center;
  margin: 0 auto 2rem;
  flex-wrap: wrap;
  background: var(--tarjeta);
  border: 1px solid var(--borde);
  border-radius: 999px;
  padding: 0.35rem;
  box-shadow: var(--sombra-suave);
  width: fit-content;
  max-width: 100%;
}

.navbar__link {
  font-family: var(--fuente-ui);
  font-weight: 700;
  font-size: 0.92rem;
  text-decoration: none;
  color: var(--bosque);
  background: transparent;
  border-radius: 999px;
  padding: 0.55rem 1.15rem;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}

.navbar__link:hover {
  background: var(--bosque-tenue);
}

.navbar__link.router-link-exact-active {
  background: var(--bosque);
  color: #fff;
}

/* Pasos — sendero del bosque ------------------------------------------------ */
.pasos {
  position: relative;
  list-style: none;
  display: flex;
  gap: 0.5rem;
  padding: 0;
  margin: 0 0 2rem;
}

.pasos::before {
  content: "";
  position: absolute;
  top: 18px;
  left: calc(100% / 6);
  right: calc(100% / 6);
  height: 2px;
  background-image: linear-gradient(to right, var(--bosque-luz) 55%, transparent 45%);
  background-size: 12px 2px;
  background-repeat: repeat-x;
  opacity: 0.6;
  z-index: 0;
}

.pasos__item {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
  font-size: 0.8rem;
  font-family: var(--fuente-ui);
  font-weight: 600;
  color: var(--gris);
}

.pasos__num {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  font-weight: 800;
  font-family: var(--fuente-ui);
  background: var(--tarjeta);
  color: var(--bosque);
  border: 2px solid var(--borde);
  box-shadow: var(--sombra-suave);
  transition: all 0.2s;
}

.pasos__item[data-state="active"] .pasos__num {
  background: var(--bosque);
  border-color: var(--bosque);
  color: #fff;
  transform: scale(1.14);
}

.pasos__item[data-state="active"] .pasos__label {
  color: var(--bosque-osc);
}

.pasos__item[data-state="done"] .pasos__num {
  background: var(--dorado);
  border-color: var(--dorado);
  color: #fff;
}

/* Panel ------------------------------------------------------------------- */
.panel {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 1.75rem;
  align-items: start;
}

@media (max-width: 720px) {
  .panel {
    grid-template-columns: 1fr;
  }
}

/* Tarjetas estilo bitacora — washi tape ------------------------------------ */
.subida,
.resultado {
  position: relative;
}

.subida::before,
.resultado::before {
  content: "";
  position: absolute;
  top: -10px;
  width: 64px;
  height: 22px;
  border-radius: 2px;
  opacity: 0.85;
  box-shadow: var(--sombra-suave);
  z-index: 2;
  pointer-events: none;
}

.subida::before {
  left: 24px;
  background: var(--coral);
  transform: rotate(-6deg);
}

.resultado::before {
  right: 28px;
  background: var(--dorado);
  transform: rotate(5deg);
}

/* Subida ------------------------------------------------------------------ */
.subida {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: rotate(-0.6deg);
  transition: transform 0.2s;
}

.subida:hover {
  transform: rotate(0deg);
}

.subida__drop {
  display: grid;
  place-items: center;
  min-height: 280px;
  padding: 1rem;
  border: 2.5px dashed #b9d4c1;
  border-radius: var(--radio);
  background: var(--tarjeta);
  cursor: pointer;
  box-shadow: var(--sombra-suave);
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
}

.subida__drop:hover {
  border-color: var(--bosque);
  background: #f1f7f0;
  box-shadow: var(--sombra);
}

.subida__drop--con-imagen {
  border-style: solid;
  padding: 0.6rem;
}

.subida__input {
  display: none;
}

.subida__texto {
  color: var(--gris);
  font-family: var(--fuente-ui);
  font-weight: 600;
  font-size: 1.05rem;
  text-align: center;
}

.subida__preview {
  max-width: 100%;
  max-height: 380px;
  border-radius: 12px;
  object-fit: contain;
}

/* Resultado --------------------------------------------------------------- */
.resultado {
  background: var(--tarjeta);
  border: 1px solid var(--borde);
  border-radius: var(--radio);
  box-shadow: var(--sombra);
  padding: 1.5rem;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: rotate(0.6deg);
  transition: transform 0.2s;
}

.resultado:hover {
  transform: rotate(0deg);
}

.resultado__vacio {
  color: var(--gris);
  text-align: center;
  font-family: var(--fuente-ui);
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.6;
}

.resultado__icono {
  font-size: 2.75rem;
  display: inline-block;
  animation: flotar 2.4s ease-in-out infinite alternate;
}

.resultado__error {
  color: var(--rojo);
  font-weight: 600;
  font-family: var(--fuente-ui);
  text-align: center;
}

/* Loader ------------------------------------------------------------------ */
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--bosque);
  font-family: var(--fuente-ui);
  font-weight: 600;
}

.loader__spinner {
  width: 42px;
  height: 42px;
  border: 4px solid var(--bosque-tenue);
  border-top-color: var(--bosque);
  border-radius: 999px;
  animation: girar 0.8s linear infinite;
}

.loader__msg {
  margin: 0;
}

@keyframes girar {
  to { transform: rotate(360deg); }
}

@keyframes flotar {
  from { transform: translateY(0); }
  to   { transform: translateY(-8px); }
}

/* Cuento ------------------------------------------------------------------ */
.cuento {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.cuento__texto {
  margin: 0;
  line-height: 1.75;
  font-size: 1.12rem;
  font-family: var(--fuente-titulo);
  color: var(--tinta);
}

.cuento__pregunta {
  margin: 0;
  padding: 0.75rem 1rem;
  background: var(--dorado-tenue);
  border-left: 4px solid var(--dorado);
  border-radius: 8px;
  font-weight: 600;
  font-family: var(--fuente-ui);
}

.cuento__label {
  font-size: 0.85rem;
  font-weight: 700;
  font-family: var(--fuente-ui);
  color: var(--gris);
}

.cuento__answer {
  width: 100%;
  min-height: 100px;
  resize: vertical;
  font: inherit;
  font-family: var(--fuente-texto);
  padding: 0.75rem;
  border: 2px solid var(--borde);
  border-radius: 12px;
  outline: none;
  transition: border-color 0.15s;
}

.cuento__answer:focus-visible {
  border-color: var(--bosque);
  outline: 2px solid var(--dorado-claro);
  outline-offset: 2px;
}

.cuento__saved {
  margin: 0;
  color: var(--bosque-luz);
  font-weight: 700;
  font-family: var(--fuente-ui);
  font-size: 0.85rem;
}

/* Botones ----------------------------------------------------------------- */
.btn {
  font-family: var(--fuente-ui);
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 14px;
  padding: 0.85rem 1.5rem;
  cursor: pointer;
  transition: transform 0.1s, background 0.15s, opacity 0.15s, box-shadow 0.15s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn:not(:disabled):active {
  transform: translateY(1px);
}

.btn:focus-visible {
  outline: 2px solid var(--dorado-claro);
  outline-offset: 2px;
}

.btn--primario {
  background: var(--coral);
  color: #fff;
  box-shadow: 0 8px 20px rgba(232, 103, 79, 0.28);
}

.btn--primario:not(:disabled):hover {
  background: var(--coral-osc);
}

.btn--grande {
  width: 100%;
  padding: 1rem;
  font-size: 1.02rem;
  border-radius: 14px;
  letter-spacing: 0.01em;
}

/* Pie --------------------------------------------------------------------- */
.app__footer {
  text-align: center;
  margin-top: 2.5rem;
  color: var(--gris);
  font-family: var(--fuente-ui);
  font-weight: 500;
  font-size: 0.85rem;
}

/* Historial ------------------------------------------------------------- */
.historial__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.historial__header h2 {
  font-family: var(--fuente-titulo);
  font-style: italic;
  color: var(--bosque-osc);
}

.historial__buscador {
  font: inherit;
  font-family: var(--fuente-texto);
  padding: 0.65rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--borde);
  min-width: 220px;
  background: var(--tarjeta);
}

.historial__lista {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.85rem;
}

.historial__link {
  display: flex;
  gap: 1rem;
  align-items: center;
  text-decoration: none;
  color: inherit;
  background: var(--tarjeta);
  border: 1px solid var(--borde);
  border-radius: var(--radio);
  padding: 0.85rem;
  box-shadow: var(--sombra-suave);
  transition: transform 0.15s, box-shadow 0.15s;
}

.historial__link:hover {
  transform: translateY(-3px) rotate(-0.4deg);
  box-shadow: var(--sombra);
}

.historial__miniatura {
  width: 68px;
  height: 68px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--borde);
}

.historial__texto {
  margin: 0 0 0.25rem;
  font-weight: 700;
  font-family: var(--fuente-ui);
}

.historial__meta {
  margin: 0;
  color: var(--gris);
  font-size: 0.85rem;
  font-family: var(--fuente-ui);
}

/* Accesibilidad ------------------------------------------------------------ */
@media (prefers-reduced-motion: reduce) {
  .app__header::before,
  .app__header::after,
  .resultado__icono,
  .loader__spinner {
    animation: none !important;
  }
}