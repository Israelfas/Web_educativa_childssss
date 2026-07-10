<script setup lang="ts">
import { ref, computed } from "vue";
import type { CuentoIA, EstadoLengua, PalabraDificil } from "../types";

const props = defineProps<{
  estado: EstadoLengua;
  cuento: CuentoIA | null;
  error: string;
  mensajeLoader: string;
}>();

const emit = defineEmits<{ guardar: [] }>();

// ===== VOZ DE NARRADOR =====
const leyendo = ref(false);
const palabraActual = ref(-1);
let utterance: SpeechSynthesisUtterance | null = null;

function leerEnVoz() {
  if (!props.cuento) return;

  if (leyendo.value) {
    window.speechSynthesis.cancel();
    leyendo.value = false;
    palabraActual.value = -1;
    return;
  }

  utterance = new SpeechSynthesisUtterance(props.cuento.cuento);
  utterance.lang = "es-ES";
  utterance.rate = 0.72;   // lento, como narrador
  utterance.pitch = 0.45;  // grave, como mago anciano
  utterance.volume = 1;

  // Intenta seleccionar voz masculina si está disponible
  const voces = window.speechSynthesis.getVoices();
  const vozEsp = voces.find(v =>
    v.lang.startsWith("es") && v.name.toLowerCase().includes("male")
  ) || voces.find(v => v.lang.startsWith("es"));
  if (vozEsp) utterance.voice = vozEsp;

  utterance.onboundary = (e) => {
    if (e.name === "word") palabraActual.value = e.charIndex;
  };
  utterance.onend = () => { leyendo.value = false; palabraActual.value = -1; };
  utterance.onerror = () => { leyendo.value = false; palabraActual.value = -1; };

  leyendo.value = true;
  window.speechSynthesis.speak(utterance);
}

// ===== PALABRAS DIFÍCILES =====
const palabraActiva = ref<PalabraDificil | null>(null);
const palabras = computed<PalabraDificil[]>(() => props.cuento?.palabras ?? []);

const textoResaltado = computed(() => {
  if (!props.cuento?.cuento) return "";
  let texto = props.cuento.cuento;
  palabras.value.forEach(({ palabra }) => {
    const regex = new RegExp(`\\b(${palabra})\\b`, "gi");
    texto = texto.replace(
      regex,
      `<mark class="palabra-clave" data-palabra="${palabra}">$1</mark>`
    );
  });
  return texto;
});

function clickPalabra(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.classList.contains("palabra-clave")) {
    const nombre = target.dataset.palabra ?? "";
    const found = palabras.value.find(
      (p) => p.palabra.toLowerCase() === nombre.toLowerCase()
    );
    palabraActiva.value = found && palabraActiva.value?.palabra === found.palabra ? null : found ?? null;
  } else {
    palabraActiva.value = null;
  }
}

// ===== MODO LECTURA =====
const modoLectura = ref(false);

// ===== CONFETI al guardar =====
function guardarConEfecto() {
  emit("guardar");
}
</script>

<template>
  <section class="resultado" :class="{ 'resultado--lectura': modoLectura }">

    <p v-if="estado === 'inicial' || estado === 'listo'" class="resultado__vacio">
      <span class="resultado__icono">🖼️</span>
      <br>Aquí aparecerá tu cuento cuando subas un dibujo y pulses «Generar».
    </p>

    <div v-else-if="estado === 'generando'" class="loader">
      <div class="loader__magia">✨</div>
      <p class="loader__msg">{{ mensajeLoader }}</p>
    </div>

    <p v-else-if="estado === 'error'" class="resultado__error">⚠ {{ error }}</p>

    <div v-else-if="estado === 'completo' && cuento" class="cuento">

      <!-- Barra de herramientas -->
      <div class="cuento__toolbar">
        <button
          type="button"
          class="btn-tool"
          :class="{ 'btn-tool--activo': leyendo }"
          @click="leerEnVoz"
          :title="leyendo ? 'Detener lectura' : 'Escuchar el cuento'"
        >
          {{ leyendo ? '⏹' : '🔊' }}
          <span>{{ leyendo ? 'Detener' : 'Escuchar' }}</span>
        </button>

        <button
          type="button"
          class="btn-tool"
          :class="{ 'btn-tool--activo': modoLectura }"
          @click="modoLectura = !modoLectura"
          title="Modo lectura"
        >
          {{ modoLectura ? '☀️' : '🌙' }}
          <span>{{ modoLectura ? 'Normal' : 'Lectura' }}</span>
        </button>

        <div v-if="palabras.length" class="cuento__palabras-hint">
          💡 <em>Toca las palabras subrayadas para aprender su significado</em>
        </div>
      </div>

      <!-- Texto del cuento -->
      <div class="cuento__caja" :class="{ 'cuento__caja--leyendo': leyendo }">
        <p
          class="cuento__texto"
          v-html="textoResaltado"
          @click="clickPalabra"
        ></p>
      </div>

      <!-- Tooltip de palabra difícil -->
      <transition name="pop">
        <div v-if="palabraActiva" class="palabra-tooltip">
          <div class="palabra-tooltip__header">
            <span class="palabra-tooltip__icono">📖</span>
            <strong>{{ palabraActiva.palabra }}</strong>
          </div>
          <p>{{ palabraActiva.definicion }}</p>
          <button class="palabra-tooltip__cerrar" @click="palabraActiva = null" aria-label="Cerrar">✕</button>
        </div>
      </transition>

      <!-- Pregunta -->
      <div class="cuento__pregunta-caja">
        <span class="cuento__pregunta-icono">🤔</span>
        <p class="cuento__pregunta">{{ cuento.pregunta }}</p>
      </div>

      <button type="button" class="btn btn--primario btn--grande" @click="guardarConEfecto">
        Responder la pregunta →
      </button>
    </div>
  </section>
</template>

<style scoped>
/* ===== TOOLBAR ===== */
.cuento__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.btn-tool {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1.5px solid #c8dfc0;
  background: #f0f9f0;
  color: #1b4332;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-tool:hover { background: #dff0d8; }

.btn-tool--activo {
  background: #1b4332;
  color: #fff;
  border-color: #1b4332;
}

.cuento__palabras-hint {
  font-size: 12px;
  color: #6b7a72;
  margin-left: auto;
}

/* ===== CAJA DEL CUENTO ===== */
.cuento__caja {
  background: #faf7f0;
  border-radius: 12px;
  padding: 16px 20px;
  border: 1px solid #e8e0d0;
  transition: background 0.3s;
}

.cuento__caja--leyendo {
  background: #f0f9f0;
  border-color: #a8c9b5;
  box-shadow: 0 0 0 3px rgba(27, 67, 50, 0.08);
}

/* ===== PALABRAS ===== */
:deep(.palabra-clave) {
  background: #fef08a;
  border-radius: 3px;
  cursor: pointer;
  padding: 1px 3px;
  font-style: normal;
  border-bottom: 2px solid #f59e0b;
  transition: background 0.15s;
}

:deep(.palabra-clave:hover) {
  background: #fde047;
}

.palabra-tooltip {
  position: relative;
  background: #1c2a24;
  color: #f0f9f0;
  border-radius: 12px;
  padding: 14px 40px 14px 16px;
  font-size: 14px;
  line-height: 1.6;
  border-left: 4px solid #d4a017;
}

.palabra-tooltip__header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.palabra-tooltip__header strong {
  color: #fcd34d;
  font-size: 15px;
}

.palabra-tooltip p { margin: 0; color: #d1fae5; }

.palabra-tooltip__cerrar {
  position: absolute;
  top: 10px;
  right: 12px;
  background: none;
  border: none;
  color: #6b7a72;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  line-height: 1;
}

.palabra-tooltip__cerrar:hover { color: #fff; }

/* ===== PREGUNTA ===== */
.cuento__pregunta-caja {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: #fef9ec;
  border-left: 4px solid #d4a017;
  border-radius: 10px;
  padding: 12px 14px;
}

.cuento__pregunta-icono { font-size: 20px; flex-shrink: 0; }

.cuento__pregunta {
  margin: 0;
  font-weight: 600;
  line-height: 1.5;
  color: #1c2a24;
}

/* ===== BOTÓN GRANDE ===== */
.btn--grande {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 14px;
  letter-spacing: 0.01em;
}

/* ===== VACIO / LOADER ===== */
.resultado__icono { font-size: 2.5rem; }

.loader__magia {
  font-size: 2.5rem;
  animation: flotar 1.2s ease-in-out infinite alternate;
}

@keyframes flotar {
  from { transform: translateY(0); }
  to   { transform: translateY(-8px); }
}

/* ===== MODO LECTURA ===== */
.resultado--lectura {
  background: #1c2a24 !important;
  color: #f0f9f0 !important;
}

.resultado--lectura .cuento__caja {
  background: #263832;
  border-color: #3a5246;
}

.resultado--lectura :deep(.cuento__texto) {
  color: #e8f5e9;
}

/* ===== TRANSICIONES ===== */
.pop-enter-active { animation: popIn 0.2s ease; }
.pop-leave-active { animation: popIn 0.15s ease reverse; }

@keyframes popIn {
  from { opacity: 0; transform: scale(0.95) translateY(4px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
</style>