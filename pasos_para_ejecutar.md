# Pasos para ejecutar DrawTale Edu

## Prerrequisitos

- Node.js 20+
- npm
- Proyecto Supabase creado con tablas y RLS (ver SQL en README)
- Usuario creado en Supabase Authentication

## 1. Configurar variables de entorno

Cada módulo necesita un archivo `.env` en su raíz con:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

Los módulos que necesitan `.env`:

- `contenedora/`
- `modulo-matematicas-react/`
- `modulo-lengua-ia-vue/`

## 2. Construir los módulos

```powershell
cd modulo-matematicas-react
npm run build
cd ..

cd modulo-lengua-ia-vue
npm run build
cd ..
```



## 3. Copiar builds a la contenedora

```powershell
New-Item -ItemType Directory -Path contenedora\dist\react -Force
New-Item -ItemType Directory -Path contenedora\dist\vue -Force
Copy-Item -Recurse -Path "modulo-matematicas-react\dist\*" -Destination "contenedora\dist\react\"
Copy-Item -Recurse -Path "modulo-lengua-ia-vue\dist\*" -Destination "contenedora\dist\vue\"
```


## 4. Servir localmente

```powershell
cd contenedora
npm run preview
```

Abrir `http://localhost:4173` en el navegador.

## 5. Iniciar sesión

Usar el usuario creado en Supabase Authentication.
`israel@gmail.com` / `Demo1234`

## 6. Probar los módulos

- **Matemáticas**: clic en "Matemáticas" → carga el módulo React
- **Lengua con IA**: clic en "Lengua con IA" → carga el módulo Vue
- **Inglés**: clic en "Inglés" → carga el módulo Angular (si está construido)

## Notas

- Los 3 módulos comparten la misma sesión (token en localStorage)
- Lo que escribe un módulo en Supabase puede leerlo otro
- Si un módulo no está construido, muestra un placeholder
