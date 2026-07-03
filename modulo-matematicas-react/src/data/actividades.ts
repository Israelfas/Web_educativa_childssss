import type { ActividadEducativa } from "../types";

export const ACTIVIDADES_MATEMATICAS: ActividadEducativa[] = [
  {
    id: "compra-lista",
    titulo: "Compra lista",
    area: "Matematicas",
    descripcion: "Suma precios hasta 1000 y calcula el cambio.",
    nivel: "Basico",
    puntos: 20,
    objetivo: "Practicar sumas y restas con situaciones de compra.",
  },
  {
    id: "tablas-relampago",
    titulo: "Tablas relampago",
    area: "Matematicas",
    descripcion: "Multiplicaciones del 1 al 10 contra reloj.",
    nivel: "Intermedio",
    puntos: 30,
    objetivo: "Responder multiplicaciones simples con rapidez.",
  },
  {
    id: "reparte-dulces",
    titulo: "Reparte dulces",
    area: "Matematicas",
    descripcion: "Divisiones simples con grupos iguales.",
    nivel: "Intermedio",
    puntos: 25,
    objetivo: "Relacionar division con reparto equitativo.",
  },
  {
    id: "pizza-fraccionada",
    titulo: "Pizza fraccionada",
    area: "Matematicas",
    descripcion: "Mitad, cuarto y tercio con piezas visuales.",
    nivel: "Avanzado",
    puntos: 35,
    objetivo: "Reconocer fracciones frecuentes en objetos cotidianos.",
  },
];
