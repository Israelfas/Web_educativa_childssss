import type { Pregunta } from "../types";

// Generador puro de preguntas (sin React): suma, resta sin negativos
// y tablas de multiplicar del 2 al 10.

function entreAleatorio(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Genera una pregunta aleatoria de suma, resta o multiplicacion. */
export function generarPregunta(): Pregunta {
  const tipo = entreAleatorio(0, 2);

  if (tipo === 0) {
    // Suma con resultado hasta 1000.
    const a = entreAleatorio(100, 600);
    const b = entreAleatorio(50, 400);
    return { texto: `${a} + ${b} = ?`, resultado: a + b, tipo: "suma" };
  }

  if (tipo === 1) {
    // Resta sin resultados negativos.
    const a = entreAleatorio(300, 999);
    const b = entreAleatorio(10, 299);
    return { texto: `${a} − ${b} = ?`, resultado: a - b, tipo: "resta" };
  }

  // Tablas de multiplicar del 2 al 10.
  const a = entreAleatorio(2, 10);
  const b = entreAleatorio(2, 10);
  return { texto: `${a} × ${b} = ?`, resultado: a * b, tipo: "multiplicacion" };
}
