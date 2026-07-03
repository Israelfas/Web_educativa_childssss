import { Link, useNavigate, useParams } from "react-router-dom";
import { useMatematicas } from "../context/MatematicasContext";

export default function DetalleActividadView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { buscarActividad, registrarPractica, progreso } = useMatematicas();
  const actividad = id ? buscarActividad(id) : undefined;

  if (!actividad) {
    return (
      <section className="panel">
        <h2>Actividad no encontrada</h2>
        <p>El parametro de la URL no coincide con una actividad del mock.</p>
        <Link className="btn btn--primario btn--link" to="/">
          Volver al listado
        </Link>
      </section>
    );
  }

  const practica = progreso.find((item) => item.actividadId === actividad.id);

  return (
    <section className="detalle">
      <span className="card__meta">
        {actividad.area} - {actividad.nivel} - {actividad.puntos} pts
      </span>
      <h2>{actividad.titulo}</h2>
      <p>{actividad.descripcion}</p>
      <dl className="detalle__datos">
        <div>
          <dt>Objetivo</dt>
          <dd>{actividad.objetivo}</dd>
        </div>
        <div>
          <dt>Intentos registrados</dt>
          <dd>{practica?.intentos ?? 0}</dd>
        </div>
      </dl>
      <div className="acciones">
        <button
          type="button"
          className="btn btn--primario"
          onClick={() => {
            registrarPractica(actividad.id);
            navigate("/progreso");
          }}
        >
          Marcar practicada
        </button>
        <button
          type="button"
          className="btn btn--secundario"
          onClick={() => navigate("/reto")}
        >
          Ir al reto
        </button>
      </div>
    </section>
  );
}
