<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const TITLE = 'フロントエンドコーディング試験';

    return { TITLE };
  },
});
</script>

<template>
  <h1>{{ TITLE }}</h1>
</template>

<style scoped></style>
