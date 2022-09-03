<script lang="ts">
import { defineComponent } from 'vue';
import MainLayout from '~/components/layout/MainLayout.vue';

export default defineComponent({
  components: { MainLayout },
  setup() {
    const TITLE = 'フロントエンドコーディング試験';

    return { TITLE };
  },
});
</script>

<template>
  <MainLayout>
    <h1 class="title">
      {{ TITLE }}
    </h1>
  </MainLayout>
</template>

<style scoped>
.title {
  font-size: 24px;
  text-align: center;
}
</style>
