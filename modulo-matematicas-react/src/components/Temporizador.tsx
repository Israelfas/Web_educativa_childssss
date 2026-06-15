import { formatearTiempo } from "../lib/tiempo";

interface Props {
  segundosRestantes: number;
}

/** Muestra el tiempo restante; resalta los ultimos 10 segundos. */
export default function Temporizador({ segundosRestantes }: Props) {
  const critico = segundosRestantes <= 10;
  return (
    <div
      className={`temporizador${critico ? " temporizador--critico" : ""}`}
      role="timer"
      aria-label="Tiempo restante"
    >
      ⏱ {formatearTiempo(segundosRestantes)}
    </div>
  );
}
