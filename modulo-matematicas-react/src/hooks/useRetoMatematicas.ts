import { useCallback, useEffect, useState } from "react";
import { generarPregunta } from "../lib/preguntas";
import { useLocalStorage } from "./useLocalStorage";
import type { EstadoJuego, Pregunta, RecordMatematicas } from "../types";

const DURACION_SEGUNDOS = 90;
const CLAVE_RECORD = "drawtale-record-matematicas";
const SOLO_ENTEROS = /^\d+$/;

interface Feedback {
  mensaje: string;
  tipo: "ok" | "error" | "info";
}

export interface RetoMatematicas {
  estado: EstadoJuego;
  pregunta: Pregunta | null;
  puntaje: number;
  mejorPuntaje: number;
  segundosRestantes: number;
  feedback: Feedback;
  respuesta: string;
  esRespuestaValida: boolean;
  comenzar: () => void;
  cambiarRespuesta: (valor: string) => void;
  comprobar: () => void;
}

/** Encapsula el ciclo de vida completo del reto de matematicas. */
export function useRetoMatematicas(): RetoMatematicas {
  const [estado, setEstado] = useState<EstadoJuego>("inactivo");
  const [pregunta, setPregunta] = useState<Pregunta | null>(null);
  const [puntaje, setPuntaje] = useState(0);
  const [segundosRestantes, setSegundos] = useState(DURACION_SEGUNDOS);
  const [respuesta, setRespuesta] = useState("");
  const [feedback, setFeedback] = useState<Feedback>({ mensaje: "", tipo: "info" });
  const [record, setRecord] = useLocalStorage<RecordMatematicas>(CLAVE_RECORD, {
    mejorPuntaje: 0,
    fecha: "",
  });

  const esRespuestaValida =
    estado === "jugando" && SOLO_ENTEROS.test(respuesta.trim());

  // Temporizador: solo corre mientras se esta jugando. El cleanup limpia el
  // intervalo cuando cambia el estado o se desmonta el componente.
  useEffect(() => {
    if (estado !== "jugando") return;
    const id = window.setInterval(() => {
      setSegundos((s) => s - 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [estado]);

  // Fin del reto por tiempo agotado. Se ejecuta con el puntaje actualizado.
  useEffect(() => {
    if (estado !== "jugando" || segundosRestantes > 0) return;

    setEstado("terminado");
    setPregunta(null);
    setRespuesta("");

    if (puntaje > record.mejorPuntaje) {
      setRecord({ mejorPuntaje: puntaje, fecha: new Date().toISOString() });
      setFeedback({ mensaje: `🏆 ¡Nuevo récord: ${puntaje} aciertos!`, tipo: "ok" });
    } else {
      setFeedback({ mensaje: `Terminaste con ${puntaje} aciertos.`, tipo: "info" });
    }
  }, [estado, segundosRestantes, puntaje, record.mejorPuntaje, setRecord]);

  const comenzar = useCallback(() => {
    setPuntaje(0);
    setSegundos(DURACION_SEGUNDOS);
    setRespuesta("");
    setFeedback({ mensaje: "", tipo: "info" });
    setPregunta(generarPregunta());
    setEstado("jugando");
  }, []);

  // Validacion en tiempo real: solo numeros enteros.
  const cambiarRespuesta = useCallback((valor: string) => {
    setRespuesta(valor);
    const limpio = valor.trim();
    if (limpio === "" || SOLO_ENTEROS.test(limpio)) {
      setFeedback({ mensaje: "", tipo: "info" });
    } else {
      setFeedback({
        mensaje: "Escribe solo números, sin letras ni espacios.",
        tipo: "error",
      });
    }
  }, []);

  const comprobar = useCallback(() => {
    if (estado !== "jugando" || pregunta === null) return;
    const limpio = respuesta.trim();
    if (!SOLO_ENTEROS.test(limpio)) return;

    if (Number(limpio) === pregunta.resultado) {
      setPuntaje((p) => p + 1);
      setFeedback({ mensaje: "✔ ¡Correcto!", tipo: "ok" });
    } else {
      setFeedback({ mensaje: `✘ Era ${pregunta.resultado}. ¡Sigue!`, tipo: "error" });
    }

    setRespuesta("");
    setPregunta(generarPregunta());
  }, [estado, pregunta, respuesta]);

  return {
    estado,
    pregunta,
    puntaje,
    mejorPuntaje: record.mejorPuntaje,
    segundosRestantes,
    feedback,
    respuesta,
    esRespuestaValida,
    comenzar,
    cambiarRespuesta,
    comprobar,
  };
}
