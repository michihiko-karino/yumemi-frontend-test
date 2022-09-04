import { inject, provide, reactive } from 'vue';
import {
  PrefecturesResponse,
  PopulationLabeledDataSet,
  getPrefectures,
  getPopulationCompositionPerYear,
} from '~/api/ResasApiClient';

type PrefCode = PrefecturesResponse['result'][number]['prefCode'];
export type State = {
  prefectures: PrefecturesResponse['result'];
  selectedPrefCodes: Array<PrefCode>;
  totalPopulationDataSets: Array<{
    prefCode: PrefCode;
    data: PopulationLabeledDataSet['data'];
  }>;
};

const initialState: State = {
  prefectures: [],
  selectedPrefCodes: [],
  totalPopulationDataSets: [],
};

export const mutations = (state: State) => ({
  getPrefectures: async () => {
    try {
      state.prefectures = await getPrefectures();
    } catch {
      // 何もしない
    }
  },
  updateTotalPopulationDataSets: async (prefCode: PrefCode) => {
    const isExistDataSet = state.totalPopulationDataSets.find(
      (dataset) => dataset.prefCode === prefCode
    );
    if (isExistDataSet !== undefined) {
      return;
    }

    try {
      const response = await getPopulationCompositionPerYear(prefCode);
      const totalPopulationDataSet = response.data.find(
        (dataset) => dataset.label === '総人口'
      );
      state.totalPopulationDataSets.push({
        prefCode,
        data: totalPopulationDataSet?.data ?? [],
      });
    } catch {
      // 何もしない
    }
  },
});

const storeSymbol = Symbol();

const createStore = () => {
  const state = reactive(initialState);

  return {
    state: state,
    ...mutations(state),
  };
};

export const provideStore = () => {
  provide(storeSymbol, createStore());
};

export const useStore = () => {
  const store = inject(storeSymbol) as ReturnType<typeof createStore>;
  return store;
};
