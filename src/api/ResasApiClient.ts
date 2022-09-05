import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_ENDPOINT,
  timeout: 5000,
});

type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesResponse = {
  message: null;
  result: Array<Prefecture>;
};

export const getPrefectures = async () => {
  const response = await apiClient.get<PrefecturesResponse>('prefectures');
  return response.data.result;
};

type YearAndPopulationValue = {
  year: number;
  value: number;
  // rate: number; // 総人口以外のラベルデータセットの場合rateフィールドも存在する。今回は総人口のみ必要のためコメントで対応する
};

export type PopulationLabeledDataSet = {
  label: string;
  data: Array<YearAndPopulationValue>;
};

export type PopulationCompositionPerYearResponse = {
  message: null;
  result: {
    boundaryYear: number;
    data: Array<PopulationLabeledDataSet>;
  };
};

export const getPopulationCompositionPerYear = async (prefCode: number) => {
  const response = await apiClient.get<PopulationCompositionPerYearResponse>(
    'populationCompositionPerYear',
    {
      params: {
        prefCode,
        cityCode: '-',
      },
    }
  );

  return response.data.result;
};
