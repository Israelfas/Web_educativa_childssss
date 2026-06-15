// Interfaces compartidas del modulo de Matematicas.

/** Una tarjeta de actividad cargada desde el mock JSON. */
export interface Actividad {
  label: string;
  detail: string;
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

/** Fases por las que pasa el reto. */
export type EstadoJuego = "inactivo" | "jugando" | "terminado";
