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

// ===== VOZ =====
const leyendo = ref(false);
let utterance: SpeechSynthesisUtterance | null = null;

function leerEnVoz() {
  if (!props.cuento) return;

  if (leyendo.value) {
    window.speechSynthesis.cancel();
    leyendo.value = false;
    return;
  }

  utterance = new SpeechSynthesisUtterance(props.cuento.cuento);
  utterance.lang = "es-ES";
  utterance.rate = 0.85;
  utterance.onend = () => { leyendo.value = false; };
  utterance.onerror = () => { leyendo.value = false; };
  leyendo.value = true;
  window.speechSynthesis.speak(utterance);
}

// ===== PALABRAS DIFÍCILES =====
const palabraActiva = ref<PalabraDificil | null>(null);

const palabras = computed<PalabraDificil[]>(() =>
  props.cuento?.palabras ?? []
);

// Resalta palabras difíciles en el texto del cuento
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
    palabraActiva.value = found ?? null;
  } else {
    palabraActiva.value = null;
  }
}
</script>

<template>
  <section class="resultado">
    <p v-if="estado === 'inicial' || estado === 'listo'" class="resultado__vacio">
      Aquí aparecerá tu cuento cuando subas un dibujo y pulses «Generar».
    </p>

    <div v-else-if="estado === 'generando'" class="loader">
      <span class="loader__spinner" aria-hidden="true"></span>
      <p class="loader__msg">{{ mensajeLoader }}</p>
    </div>

    <p v-else-if="estado === 'error'" class="resultado__error">⚠ {{ error }}</p>

    <div v-else-if="estado === 'completo' && cuento" class="cuento">

      <!-- Texto con palabras resaltadas -->
      <p
        class="cuento__texto"
        v-html="textoResaltado"
        @click="clickPalabra"
      ></p>

      <!-- Tooltip de palabra difícil -->
      <transition name="fade">
        <div v-if="palabraActiva" class="palabra-tooltip">
          <strong>{{ palabraActiva.palabra }}</strong>
          <span>{{ palabraActiva.definicion }}</span>
          <button class="palabra-tooltip__cerrar" @click="palabraActiva = null">✕</button>
        </div>
      </transition>

      <!-- Botón leer en voz alta -->
      <button
        type="button"
        class="btn btn--voz"
        :class="{ 'btn--voz--activo': leyendo }"
        @click="leerEnVoz"
        :aria-label="leyendo ? 'Detener lectura' : 'Leer en voz alta'"
      >
        {{ leyendo ? '⏹ Detener' : '🔊 Leer en voz alta' }}
      </button>

      <p class="cuento__pregunta">🤔 {{ cuento.pregunta }}</p>

      <button type="button" class="btn btn--primario" @click="emit('guardar')">
        Continuar → Responder la pregunta
      </button>
    </div>
  </section>
</template>

<style scoped>
.palabra-clave {
  background: #fef08a;
  border-radius: 3px;
  cursor: pointer;
  padding: 0 2px;
  font-style: normal;
}

.palabra-clave:hover {
  background: #fde047;
}

.palabra-tooltip {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #1e293b;
  color: #f1f5f9;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  margin-bottom: 8px;
}

.palabra-tooltip strong {
  color: #fbbf24;
  white-space: nowrap;
}

.palabra-tooltip__cerrar {
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  padding: 0;
}

.btn--voz {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f0f9ff;
  border: 1.5px solid #38bdf8;
  color: #0369a1;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  margin-bottom: 12px;
}

.btn--voz:hover { background: #e0f2fe; }

.btn--voz--activo {
  background: #fef2f2;
  border-color: #f87171;
  color: #dc2626;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>