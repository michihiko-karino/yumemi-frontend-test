import { defineComponent, h, PropType, ref } from 'vue';

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
  type ChartData
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

export default defineComponent({
  components: { LineChart },

  props: {
    datasets: {
      type: Array as PropType<ChartData<'line'>['datasets']>,
      required: true
    }
  },

  setup(props) {
    const chartData = ref<ChartData<'line'>>({
      labels: [1960,1965,1970,1975,1980,1985,1990,1995,2000,2005,2010,2015,2020,2025,2030,2035,2040,2045],
      datasets: props.datasets
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };

    return () =>
      h(LineChart, {
        chartData: chartData.value,
        chartOptions,
        chartId: 'population-chart',
        width: 400,
        height: 400
      });
  }
});