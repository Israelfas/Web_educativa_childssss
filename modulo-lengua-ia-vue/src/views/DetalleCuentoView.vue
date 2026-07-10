<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useHistorialStore } from "../stores/historial";

const route = useRoute();
const historial = useHistorialStore();

const id = computed(() => route.params.id as string);
const cuento = computed(() => historial.obtenerPorId(id.value));

const respuesta = computed({
  get: () => cuento.value?.respuesta ?? "",
  set: (texto: string) => {
    if (cuento.value) historial.actualizarRespuesta(id.value, texto);
  },
});

// Si el store aún no cargó, lo iniciamos aquí para el caso de
// acceso directo a la URL del cuento (deep link).
onMounted(async () => {
  if (historial.cargando) await historial.iniciar();
});
</script>

<template>
  <section class="resultado">
    <!-- Cargando desde Supabase -->
    <p v-if="historial.cargando" class="resultado__error" style="color: var(--color-texto-suave)">
      Cargando cuento…
    </p>

    <!-- Cuento no encontrado -->
    <p v-else-if="!cuento" class="resultado__error">
      No encontramos ese cuento.
      <RouterLink to="/historial">Volver al historial</RouterLink>
    </p>

    <!-- Cuento encontrado -->
    <div v-else class="cuento">
      <img :src="cuento.dibujoDataUrl" alt="Dibujo original" class="subida__preview" />
      <p class="cuento__texto">{{ cuento.texto }}</p>
      <p class="cuento__pregunta">🤔 {{ cuento.pregunta }}</p>

      <label class="cuento__label" for="respuesta">Tu respuesta:</label>
      <textarea
        id="respuesta"
        v-model="respuesta"
        class="cuento__answer"
        placeholder="Escribe aquí lo que piensas…"
      ></textarea>
      <p v-if="respuesta.trim().length > 0" class="cuento__saved">Guardado ✓</p>

      <RouterLink to="/historial" class="btn">← Volver al historial</RouterLink>
    </div>
  </section>
</template>