# DrawTale Edu

Plataforma interactiva de práctica para niños de primaria dividida en tres módulos — Matemáticas, Lengua con IA e Inglés — integrados en una contenedora con login único y backend compartido en Supabase.

**URL de producción:** https://web-educativa-childssss.vercel.app

---

## Quién construyó qué

| Integrante | Módulo | Framework |
|---|---|---|
| Marcelo Israel Mejia Chamorro | Lengua con IA | Vue 3 + Vite + TypeScript |
| Robert Alejandro Garcia Reyes | Matemáticas | React 18 + Vite + TypeScript |
| Luis Mario Cedeño Bravo | Inglés | Angular 22 + TypeScript |

---

## Qué hace el producto

DrawTale Edu tiene tres módulos independientes que comparten sesión y backend:

**Matemáticas (React)** — Reto contra reloj de 90 segundos. El niño resuelve operaciones aleatorias (suma, resta, multiplicación), recibe feedback en tiempo real y su mejor puntaje se guarda en Supabase.

**Lengua con IA (Vue)** — El niño sube un dibujo propio, la IA (Groq Vision con Llama 4 Scout) genera un cuento corto inspirado en él y una pregunta de comprensión lectora. El niño responde y su historial queda guardado en Supabase.

**Inglés (Angular)** — Vocabulario por temas con pronunciación en inglés (Web Speech API) y quiz interactivo con feedback animado.

---

## Cómo ejecutar localmente

### Prerrequisitos
- Node.js 20+
- npm

### 1. Clonar el repositorio
```bash
git clone https://github.com/Israelfas/Web_educativa_childssss.git
cd Web_educativa_childssss
```

### 2. Variables de entorno

Cada módulo necesita un `.env` en su carpeta raíz:

**contenedora/.env**
```
VITE_SUPABASE_URL=https://vbrkrvtsgmenhstrqbgj.supabase.co
VITE_SUPABASE_ANON_KEY=<anon_key>
```

**modulo-matematicas-react/.env**
```
VITE_SUPABASE_URL=https://vbrkrvtsgmenhstrqbgj.supabase.co
VITE_SUPABASE_ANON_KEY=<anon_key>
```

**modulo-lengua-ia-vue/.env**
```
VITE_GROQ_KEY=<tu_key_de_groq>
VITE_SUPABASE_URL=https://vbrkrvtsgmenhstrqbgj.supabase.co
VITE_SUPABASE_ANON_KEY=<anon_key>
```

### 3. Levantar cada módulo en terminales separadas

```bash
# Contenedora (login + menú)
cd contenedora && npm install && npm run dev
# → http://localhost:5173

# Matemáticas
cd modulo-matematicas-react && npm install && npm run dev
# → http://localhost:5174/react/

# Lengua con IA
cd modulo-lengua-ia-vue && npm install && npm run dev
# → http://localhost:5175/vue/

# Inglés
cd modulo-ingles-angular && npm install && npm start
# → http://localhost:4200/angular/
```

### 4. Credenciales de prueba
```
Email: Israel@gmail.com
Password: Demo1234
```

---

## Capturas

### Login
![Login](https://web-educativa-childssss.vercel.app)

### Módulo Lengua con IA
El niño sube un dibujo → la IA genera un cuento personalizado → aparece una pregunta de comprensión lectora.

### Módulo Matemáticas
Reto contra reloj con operaciones aleatorias y puntaje en vivo.

### Módulo Inglés
Vocabulario por temas con pronunciación y quiz con feedback animado.

---

## Arquitectura de integración

```
web-educativa-childssss.vercel.app/
├── index.html        ← Contenedora (login + menú, Vite vanilla-ts)
├── react/            ← Build del módulo Matemáticas
├── vue/              ← Build del módulo Lengua con IA
└── angular/          ← Build del módulo Inglés
```

Los tres módulos viven bajo el mismo dominio, lo que permite compartir `localStorage`. La contenedora hace el login contra Supabase y guarda el token; cada módulo lo lee al arrancar y redirige a `/` si no hay sesión.

---

## Decisiones y aprendizajes

### Cómo dividimos los módulos
Cada integrante tomó un módulo completo (UI + lógica + integración con Supabase) y su framework asignado. La contenedora usa Vite vanilla-ts y carga cada módulo dentro de un `<iframe>` apuntando a su subcarpeta. Al vivir todos bajo el mismo origen, comparten `localStorage` sin necesidad de postMessage ni librerías de sesión.

### El problema técnico más difícil de cada integrante

**Marcelo (Lengua con IA — Vue):** El mayor reto fue el CORS al llamar directamente a la API de IA desde el browser. La solución fue usar el proxy de Vite en desarrollo y configurar correctamente las variables de entorno en Vercel para producción. También fue desafiante mantener el estado del flujo de 3 pasos de forma reactiva con composables de Vue sin caer en mutaciones directas del DOM.

**Robert (Matemáticas — React):** El reto principal fue el manejo del temporizador con `useEffect` — evitar fugas de memoria al limpiar el intervalo correctamente cuando el componente se desmonta o el reto termina. En el Hito 2 esto era un `setInterval` suelto; en React hay que retornar la función de limpieza explícitamente.

**Luis (Inglés — Angular):** La integración de la Web Speech API con los signals de Angular fue el mayor desafío. La pronunciación es asíncrona y el estado del quiz es reactivo, lo que requirió coordinar ambos sistemas sin que se pisaran. La solución fue encapsular el speech en un servicio inyectable independiente del estado del quiz.

### Qué haríamos distinto
Integraríamos los módulos en la contenedora desde la primera semana en lugar de hacerlo al final. Tener el esqueleto desplegado desde el día uno habría evitado la mayoría de los problemas de configuración de Vercel y de rutas base que encontramos en las últimas horas.

---

## Tecnologías

- **Contenedora:** Vite 8 + vanilla TypeScript + Supabase JS
- **Matemáticas:** React 18 + Vite 6 + TypeScript
- **Lengua con IA:** Vue 3 + Vite 6 + TypeScript + Groq Vision (Llama 4 Scout)
- **Inglés:** Angular 22 + TypeScript + Web Speech API
- **Backend:** Supabase (Auth + PostgreSQL + RLS)
- **Deploy:** Vercel