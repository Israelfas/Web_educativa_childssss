import { useNavigate } from "react-router-dom";
import ListaActividades from "../components/ListaActividades";
import { useMatematicas } from "../context/MatematicasContext";

export default function InicioView() {
  const { filtro, setFiltro, actividadesFiltradas } = useMatematicas();
  const navigate = useNavigate();

  return (
    <>
      <section className="panel">
        <h2>Actividades de matematicas</h2>
        <p>
          Selecciona una actividad, revisa su detalle y practica el reto con
          datos simulados en memoria.
        </p>
        <label className="filtro">
          <span>Filtrar por titulo, descripcion o nivel</span>
          <input
            type="search"
            value={filtro}
            onChange={(evento) => setFiltro(evento.target.value)}
            placeholder="Ej. tablas, basico, pizza"
          />
        </label>
      </section>

      <ListaActividades
        actividades={actividadesFiltradas}
        onSeleccionar={(id) => navigate(`/actividades/${id}`)}
      />
    </>
  );
}
