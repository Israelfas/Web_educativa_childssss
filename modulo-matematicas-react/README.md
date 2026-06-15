# Módulo de Matemáticas — DrawTale Edu (React)

Módulo individual del **Hito 3** de IS-403 (Aplicaciones para el Cliente Web).
Construido en **React + Vite + TypeScript** por **Robert García**.

> Estado: módulo funcional — reto contra reloj completo, compila a producción sin errores.

## Responsabilidad dentro del producto

DrawTale Edu es una plataforma de práctica para niños dividida en tres módulos
(Matemáticas, Lengua con IA, Inglés). Este repositorio contiene **únicamente el
módulo de Matemáticas**: un **reto contra reloj** que genera operaciones
aleatorias (suma, resta, multiplicación), valida la respuesta en tiempo real,
lleva el puntaje en vivo y guarda el mejor puntaje del jugador.

En el Hito 3 funciona **de forma aislada** (datos desde un mock JSON). En el
Hito 4 se integrará en la contenedora JS pura y se conectará a Supabase.

## Cómo ejecutarlo localmente

```bash
npm install
npm run dev       # servidor de desarrollo (Vite)
npm run build     # type-check + build de producción a dist/
npm run preview   # sirve el build de producción
```

## Estructura

```
public/data/actividades.json   Mock JSON con las actividades
src/main.tsx                   Bootstrap de React
src/App.tsx                    Composición de la pantalla
src/types.ts                   Interfaces compartidas
src/lib/                       Lógica pura (generador de preguntas, tiempo)
src/hooks/                     Estado y efectos (reto, localStorage)
src/components/                UI (reto, temporizador, marcador, actividades)
src/styles/app.css             Estilos
```

## Cómo funciona el reto

1. Pulsas **Comenzar**: arranca un temporizador de 90 segundos.
2. Aparecen operaciones aleatorias (suma, resta o multiplicación).
3. El input se valida en tiempo real (solo acepta números enteros).
4. Cada acierto suma un punto; el feedback indica si fue correcto.
5. Al acabarse el tiempo, si superas tu marca se guarda el **mejor puntaje**
   en `localStorage` (persiste entre sesiones).

## Decisiones técnicas (vs. JavaScript puro)

- **Lógica pura aislada** en `lib/` (sin React): `generarPregunta` y
  `formatearTiempo` son funciones puras, fáciles de probar.
- **Estado y efectos en hooks** (`useRetoMatematicas`, `useLocalStorage`): el
  temporizador vive en un `useEffect` con limpieza del intervalo, evitando las
  fugas que en JS puro había que manejar a mano.
- **Componentes "tontos"** que solo reciben props y renderizan UI.

En el Hito 2 todo esto era un único archivo `matematicas.ts` que manipulaba el
DOM directamente. Aquí la UI es declarativa: el estado cambia y React
re-renderiza solo lo necesario.

## Tecnologías

- React 18 + TypeScript (modo strict)
- Vite 6 como bundler y dev server
