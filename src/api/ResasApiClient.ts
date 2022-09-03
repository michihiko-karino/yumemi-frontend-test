import axios from 'axios';

export const RESAS_API_ENDPOINT = 'https://opendata.resas-portal.go.jp/';

const apiClient = axios.create({
  baseURL: RESAS_API_ENDPOINT,
  timeout: 1000,
  headers: {
    'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY,
  },
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
  const response = await apiClient.get<PrefecturesResponse>(
    'api/v1/prefectures'
  );
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
    'api/v1/population/composition/perYear',
    {
      params: {
        prefCode,
        cityCode: '-',
      },
    }
  );

  return response.data.result;
};
