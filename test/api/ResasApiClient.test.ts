import {
  getPrefectures,
  getPopulationCompositionPerYear,
} from '~/api/ResasApiClient';

describe('api/ResasApiClient.ts', () => {
  test('getPrefectures', async () => {
    const response = await getPrefectures();

    expect(response.length).toBe(4);
    expect(response.at(0)?.prefCode).toBe(1);
    expect(response.at(0)?.prefName).toBe('北海道');
  });

  test('getPopulationCompositionPerYear', async () => {
    const response = await getPopulationCompositionPerYear(1);

    expect(response.data.at(0)?.label).toBe('総人口');
    expect(response.data.at(0)?.data.length).toBe(3);
  });
});
