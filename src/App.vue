<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { getPrefectures, type PrefecturesResponse, getPopulationCompositionPerYear } from './api/ResasApiClient';
import { getTotalPopulation } from './lib/getTotalPopulation';
import TotalPopulationChart from './components/TotalPopulationChart';
import { ChartData } from 'chart.js';

export default defineComponent({
  components: { TotalPopulationChart },
  setup() {
    const TITLE = 'フロントエンドコーディング試験';
    const prefectures = ref<PrefecturesResponse['result'] | null>(null);
    const datasets: Ref<ChartData<'line'>['datasets']> = ref([]);

    const onChange = async (prefCode: number, prefName: string) => {
      const response = await getPopulationCompositionPerYear(prefCode);
      const totalPopulationDataSet = getTotalPopulation(response);

      const chartDataset: ChartData<'line'>['datasets'][number] = {
        label: prefName,
        data: totalPopulationDataSet.map(dataset => dataset.value)
      };

      datasets.value.push(chartDataset);
    };

    onMounted(async () => {
      prefectures.value = await getPrefectures();
    });

    return { TITLE, prefectures, onChange, datasets };
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
          @change="onChange(prefecture.prefCode, prefecture.prefName)"
        ><label :for="`pref-${prefecture.prefCode}`">{{
          prefecture.prefName
        }}</label>
      </li>
    </ul>

    <TotalPopulationChart :datasets="datasets" />
  </div>
</template>

<style scoped></style>
