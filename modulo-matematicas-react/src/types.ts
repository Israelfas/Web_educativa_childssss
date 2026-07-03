// Interfaces compartidas del modulo de Matematicas.

/** Entidad principal del modulo y del dominio educativo compartido. */
export interface ActividadEducativa {
  id: string;
  titulo: string;
  area: "Matematicas";
  descripcion: string;
  nivel: "Basico" | "Intermedio" | "Avanzado";
  puntos: number;
  objetivo: string;
}

/** Operacion soportada por el generador de preguntas. */
export type TipoOperacion = "suma" | "resta" | "multiplicacion";

/** Pregunta del reto: el enunciado y su resultado correcto. */
export interface Pregunta {
  texto: string;
  resultado: number;
  tipo: TipoOperacion;
}

/** Mejor puntaje persistido en localStorage. */
export interface RecordMatematicas {
  mejorPuntaje: number;
  fecha: string;
}

/** Progreso global de una actividad del modulo. */
export interface ProgresoActividad {
  actividadId: string;
  practicada: boolean;
  intentos: number;
}

/** Fases por las que pasa el reto. */
export type EstadoJuego = "inactivo" | "jugando" | "terminado";
