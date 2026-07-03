import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import DetalleActividadView from "./views/DetalleActividadView";
import InicioView from "./views/InicioView";
import ProgresoView from "./views/ProgresoView";
import RetoView from "./views/RetoView";

/** Composicion navegable del modulo de Matematicas. */
export default function App() {
  return (
    <main className="app">
      <header className="app__header">
        <p className="app__kicker">DrawTale Edu</p>
        <h1 className="app__titulo">Modulo de Matematicas</h1>
        <p className="app__sub">
          Actividades, detalle, reto y progreso con datos simulados.
        </p>
        <Navbar />
      </header>

      <Routes>
        <Route path="/" element={<InicioView />} />
        <Route path="/reto" element={<RetoView />} />
        <Route path="/progreso" element={<ProgresoView />} />
        <Route path="/actividades/:id" element={<DetalleActividadView />} />
      </Routes>

      <footer className="app__footer">
        Modulo de Matematicas - Hito 3 - React + Vite + TypeScript
      </footer>
    </main>
  );
}
