// Interfaces compartidas del modulo de Lengua con IA.

export type EstadoLengua =
  | "inicial"
  | "listo"
  | "generando"
  | "completo"
  | "error";

export interface PalabraDificil {
  palabra: string;
  definicion: string;
}

export interface CuentoIA {
  cuento: string;
  pregunta: string;
  palabras?: PalabraDificil[];
}

export interface DibujoCargado {
  dataUrl: string;
  base64: string;
  mediaType: string;
}

export interface Cuento {
  id: string;
  dibujoDataUrl: string;
  texto: string;
  pregunta: string;
  respuesta: string;
  fecha: string;
}