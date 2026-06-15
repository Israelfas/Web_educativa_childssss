import { useCallback, useState } from "react";

// Hook de persistencia tipada en localStorage.
// Lee el valor inicial una sola vez y vuelve a escribir en cada actualizacion.

export function useLocalStorage<T>(
  clave: string,
  valorInicial: T,
): [T, (valor: T) => void] {
  const [valor, setValor] = useState<T>(() => {
    try {
      const crudo = window.localStorage.getItem(clave);
      return crudo ? (JSON.parse(crudo) as T) : valorInicial;
    } catch {
      // localStorage no disponible o JSON corrupto: usamos el valor inicial.
      return valorInicial;
    }
  });

  const guardar = useCallback(
    (nuevo: T) => {
      setValor(nuevo);
      try {
        window.localStorage.setItem(clave, JSON.stringify(nuevo));
      } catch {
        // Si el almacenamiento falla (modo privado, cuota), no rompemos la app.
      }
    },
    [clave],
  );

  return [valor, guardar];
}
