import { useEffect, useState } from "react";
import type { Actividad } from "../types";

/** Carga las actividades desde el mock JSON y las muestra como tarjetas. */
export default function ListaActividades() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let activo = true;
    // BASE_URL respeta el `base: "./"` de Vite tanto en dev como en build.
    fetch(`${import.meta.env.BASE_URL}data/actividades.json`)
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("No se pudo cargar actividades.json");
        return respuesta.json();
      })
      .then((datos: Actividad[]) => {
        if (activo) setActividades(datos);
      })
      .catch(() => {
        if (activo) setError(true);
      });
    return () => {
      activo = false;
    };
  }, []);

  if (error) {
    return (
      <p className="actividades__error">No se pudieron cargar las actividades.</p>
    );
  }

  return (
    <section className="actividades" aria-label="Actividades del módulo">
      <h2 className="actividades__titulo">Lo que practicas aquí</h2>
      <div className="actividades__grid">
        {actividades.map((actividad) => (
          <article className="card" key={actividad.label}>
            <h3>{actividad.label}</h3>
            <p>{actividad.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
