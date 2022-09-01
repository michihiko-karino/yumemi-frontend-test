<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getPrefectures, type PrefecturesResponse, getPopulationCompositionPerYear } from './api/ResasApiClient';
import { getTotalPopulation } from './lib/getTotalPopulation';

export default defineComponent({
  setup() {
    const TITLE = 'フロントエンドコーディング試験';
    const prefectures = ref<PrefecturesResponse['result'] | null>(null);

    const onChange = async (prefCode: number) => {
      const response = await getPopulationCompositionPerYear(prefCode);
      const totalPopulationDataSet = getTotalPopulation(response);

      console.log(totalPopulationDataSet);
    };

    onMounted(async () => {
      prefectures.value = await getPrefectures();
    });

    return { TITLE, prefectures, onChange };
  },
});
</script>

<template>
  <div>
    <h1>{{ TITLE }}</h1>
    <ul>
      <li
        v-for="prefecture in prefectures!"
        :key="prefecture.prefCode"
      >
        <input
          :id="`pref-${prefecture.prefCode}`"
          type="checkbox"
          :value="prefecture.prefCode"
          @change="onChange(prefecture.prefCode)"
        ><label :for="`pref-${prefecture.prefCode}`">{{
          prefecture.prefName
        }}</label>
      </li>
    </ul>
  </div>
  >
</template>

<style scoped></style>
