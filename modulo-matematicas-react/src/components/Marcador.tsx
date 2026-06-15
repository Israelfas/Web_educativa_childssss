interface Props {
  puntaje: number;
  mejorPuntaje: number;
}

/** Puntaje en vivo y mejor puntaje persistido. */
export default function Marcador({ puntaje, mejorPuntaje }: Props) {
  return (
    <div className="marcador">
      <div className="marcador__item">
        <span className="marcador__label">Puntaje</span>
        <span className="marcador__valor">{puntaje}</span>
      </div>
      <div className="marcador__item">
        <span className="marcador__label">Mejor</span>
        <span className="marcador__valor">{mejorPuntaje}</span>
      </div>
    </div>
  );
}
