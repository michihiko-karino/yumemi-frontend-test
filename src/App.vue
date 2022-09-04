<script lang="ts">
import { defineComponent } from 'vue';
import MainLayout from '~/components/layout/MainLayout.vue';
import { provideStore } from '~/store';
import PrefectureSelect from '~/components/PrefectureSelect.vue';

export default defineComponent({
  components: { MainLayout, PrefectureSelect },
  setup() {
    const TITLE = 'フロントエンドコーディング試験';
    provideStore();

    return { TITLE };
  },
});
</script>

<template>
  <MainLayout>
    <h1 class="title">
      {{ TITLE }}
    </h1>

    <PrefectureSelect />
  </MainLayout>
</template>

<style scoped>
.title {
  font-size: 24px;
  text-align: center;
  padding-bottom: 20px;
}
</style>
