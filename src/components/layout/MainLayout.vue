<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
  <main>
    <slot />
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 768px) {
  main {
    max-width: 760px;
  }
}
</style>
