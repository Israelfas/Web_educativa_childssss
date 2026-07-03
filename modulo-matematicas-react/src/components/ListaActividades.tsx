import type { ActividadEducativa } from "../types";

interface Props {
  actividades: ActividadEducativa[];
  onSeleccionar: (id: string) => void;
}

/** Renderiza actividades recibidas por props y comunica la seleccion al padre. */
export default function ListaActividades({ actividades, onSeleccionar }: Props) {
  return (
    <section className="actividades" aria-label="Actividades del modulo">
      <h2 className="actividades__titulo">Lo que practicas aqui</h2>
      {actividades.length === 0 && (
        <p className="actividades__vacio">No hay actividades con ese filtro.</p>
      )}
      <div className="actividades__grid">
        {actividades.map((actividad) => (
          <article className="card" key={actividad.id}>
            <span className="card__meta">
              {actividad.nivel} - {actividad.puntos} pts
            </span>
            <h3>{actividad.titulo}</h3>
            <p>{actividad.descripcion}</p>
            <button
              type="button"
              className="btn btn--secundario"
              onClick={() => onSeleccionar(actividad.id)}
            >
              Ver detalle
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
