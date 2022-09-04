import { mutations, State } from '~/store';

describe('store.ts', () => {
  describe('mutations', () => {
    let state: State;

    beforeEach(() => {
      state = {
        prefectures: [],
        selectedPrefCodes: [],
        totalPopulationDataSets: [],
      };
    });

    test('getPrefectures', async () => {
      const { getPrefectures } = mutations(state);
      expect(state.prefectures.length).toBe(0);
      await getPrefectures();
      expect(state.prefectures.length).toBe(4);
    });

    test('updateTotalPopulationDataSets', async () => {
      const { updateTotalPopulationDataSets } = mutations(state);
      expect(state.totalPopulationDataSets.length).toBe(0);
      await updateTotalPopulationDataSets(1);
      expect(state.totalPopulationDataSets.length).toBe(1);
    });
  });
});
