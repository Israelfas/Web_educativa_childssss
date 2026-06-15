import RetoMatematicas from "./components/RetoMatematicas";
import ListaActividades from "./components/ListaActividades";

/** Composicion de la pantalla del modulo de Matematicas. */
export default function App() {
  return (
    <main className="app">
      <header className="app__header">
        <p className="app__kicker">DrawTale Edu</p>
        <h1 className="app__titulo">Reto de Matemáticas</h1>
        <p className="app__sub">
          Resuelve cuántas operaciones puedas en 90 segundos.
        </p>
      </header>

      <RetoMatematicas />
      <ListaActividades />

      <footer className="app__footer">
        Módulo de Matemáticas · Hito 3 · React + Vite + TypeScript
      </footer>
    </main>
  );
}
