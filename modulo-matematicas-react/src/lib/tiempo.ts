// Helpers puros de tiempo (sin React).

/** Formatea segundos a "mm:ss" (nunca negativo). */
export function formatearTiempo(totalSegundos: number): string {
  const seguros = Math.max(0, Math.floor(totalSegundos));
  const minutos = Math.floor(seguros / 60);
  const segundos = seguros % 60;
  return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}
