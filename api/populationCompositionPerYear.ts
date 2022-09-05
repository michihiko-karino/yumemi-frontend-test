import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

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

export const getPopulationCompositionPerYear = async (prefCode: string) => {
  const params = new URLSearchParams({
    prefCode: prefCode,
    cityCode: '-',
  });
  const response = await fetch(
    `${
      process.env.SERVER_RESAS_API_ENDPOINT
    }population/composition/perYear?${params.toString()}`,
    {
      headers: { 'X-API-KEY': process.env.SERVER_RESAS_API_KEY ?? '' },
    }
  );

  const json =
    (await response.json()) as Promise<PopulationCompositionPerYearResponse>;
  return json;
};

export default async (req: VercelRequest, res: VercelResponse) => {
  const { prefCode } = req.query;
  const result = await getPopulationCompositionPerYear(prefCode as string);
  res.json(result);
};
