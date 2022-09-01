import { getPopulationCompositionPerYear } from "../api/ResasApiClient";

export const getTotalPopulation = (apiResponse: Awaited<ReturnType<typeof getPopulationCompositionPerYear>>) => {
  const totalPopulationDataSet = apiResponse.data.find(dataset => dataset.label === '総人口');
  return totalPopulationDataSet?.data ?? [];
};
