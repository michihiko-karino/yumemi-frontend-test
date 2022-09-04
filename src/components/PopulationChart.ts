import { computed, defineComponent, h } from 'vue';

import { Line as LineChart } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  type ChartData,
} from 'chart.js';
import { useStore } from '~/store';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

export default defineComponent({
  name: 'PopulationChart',
  components: { LineChart },

  setup() {
    const { state } = useStore();
    const datasets = computed<ChartData<'line'>['datasets']>(() => {
      return state.selectedPrefCodes.map((prefCode) => ({
        label:
          state.prefectures.find(
            (prefecture) => prefecture.prefCode === prefCode
          )?.prefName ?? '',
        data: (
          state.totalPopulationDataSets.find(
            (dataset) => dataset.prefCode === prefCode
          )?.data ?? []
        ).map((data) => data.value),
        // FIXME: 選択都道府県を変更する度に色が変わる。固定にしたい
        borderColor: randomRGB(),
      }));
    });

    const chartData = computed<ChartData<'line'>>(() => ({
      labels: [
        1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015,
        2020, 2025, 2030, 2035, 2040, 2045,
      ],
      datasets: datasets.value,
    }));

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const labelPlugin = {
      id: 'label',
      afterDraw: (chart: ChartJS) => {
        const ctx = chart.ctx;
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.fillText('年度', 30, 20);

        ctx.textAlign = 'right';
        ctx.fillText('人口数', chart.width - 10, chart.height - 30);
        ctx.restore();
      },
    };

    return () =>
      state.selectedPrefCodes.length > 0
        ? h(LineChart, {
            chartData: chartData.value,
            chartOptions,
            chartId: 'population-chart',
            plugins: [labelPlugin],
          })
        : h('p', '都道府県を選択してください。');
  },
});
