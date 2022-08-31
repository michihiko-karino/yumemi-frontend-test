import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://opendata.resas-portal.go.jp/',
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
