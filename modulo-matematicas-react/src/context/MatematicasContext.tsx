import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { ACTIVIDADES_MATEMATICAS } from "../data/actividades";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { ActividadEducativa, ProgresoActividad } from "../types";

interface MatematicasContextValue {
  actividades: ActividadEducativa[];
  filtro: string;
  actividadesFiltradas: ActividadEducativa[];
  progreso: ProgresoActividad[];
  totalPuntos: number;
  setFiltro: (valor: string) => void;
  buscarActividad: (id: string) => ActividadEducativa | undefined;
  registrarPractica: (actividadId: string) => void;
}

const MatematicasContext = createContext<MatematicasContextValue | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}

export function MatematicasProvider({ children }: Props) {
  const [actividades] = useState<ActividadEducativa[]>(ACTIVIDADES_MATEMATICAS);
  const [filtro, setFiltro] = useState("");
  const [progreso, setProgreso] = useLocalStorage<ProgresoActividad[]>(
    "drawtale-progreso-matematicas",
    [],
  );

  const actividadesFiltradas = useMemo(() => {
    const texto = filtro.trim().toLowerCase();
    if (!texto) return actividades;
    return actividades.filter((actividad) =>
      `${actividad.titulo} ${actividad.descripcion} ${actividad.nivel}`
        .toLowerCase()
        .includes(texto),
    );
  }, [actividades, filtro]);

  const totalPuntos = useMemo(() => {
    return progreso.reduce((total, item) => {
      const actividad = actividades.find(
        (actual) => actual.id === item.actividadId,
      );
      return total + (item.practicada ? actividad?.puntos ?? 0 : 0);
    }, 0);
  }, [actividades, progreso]);

  function buscarActividad(id: string) {
    return actividades.find((actividad) => actividad.id === id);
  }

  function registrarPractica(actividadId: string) {
    const existe = progreso.find((item) => item.actividadId === actividadId);
    if (!existe) {
      setProgreso([{ actividadId, practicada: true, intentos: 1 }, ...progreso]);
      return;
    }

    setProgreso(
      progreso.map((item) =>
        item.actividadId === actividadId
          ? { ...item, practicada: true, intentos: item.intentos + 1 }
          : item,
      ),
    );
  }

  const value = {
    actividades,
    filtro,
    actividadesFiltradas,
    progreso,
    totalPuntos,
    setFiltro,
    buscarActividad,
    registrarPractica,
  };

  return (
    <MatematicasContext.Provider value={value}>
      {children}
    </MatematicasContext.Provider>
  );
}

export function useMatematicas() {
  const context = useContext(MatematicasContext);
  if (!context) {
    throw new Error("useMatematicas debe usarse dentro de MatematicasProvider");
  }
  return context;
}
