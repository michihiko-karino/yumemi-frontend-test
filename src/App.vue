<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getPrefectures, type PrefecturesResponse } from './api/ResasApiClient';

export default defineComponent({
  setup() {
    const TITLE = 'フロントエンドコーディング試験';
    const prefectures = ref<PrefecturesResponse['result'] | null>(null);
    const selectedPrefCodes = ref<Array<PrefecturesResponse['result'][number]['prefCode']>>([]);

    onMounted(async () => {
      prefectures.value = await getPrefectures();
    });

    return { TITLE, prefectures, selectedPrefCodes };
  },
});
</script>

<template>
  <div>
    <h1>{{ TITLE }}</h1>
    <p>selected prefCodes: {{ selectedPrefCodes }}</p>
    <ul>
      <li
        v-for="prefecture in prefectures!"
        :key="prefecture.prefCode"
      >
        <input
          :id="`pref-${prefecture.prefCode}`"
          v-model="selectedPrefCodes"
          type="checkbox"
          :value="prefecture.prefCode"
        ><label :for="`pref-${prefecture.prefCode}`">{{
          prefecture.prefName
        }}</label>
      </li>
    </ul>
  </div>
  >
</template>

<style scoped></style>
