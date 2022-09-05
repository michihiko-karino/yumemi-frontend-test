import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesResponse = {
  message: null;
  result: Array<Prefecture>;
};

const getPrefectures = async () => {
  const response = await fetch(
    `${process.env.SERVER_RESAS_API_ENDPOINT}prefectures`,
    {
      headers: {
        'X-API-KEY': process.env.SERVER_RESAS_API_KEY ?? '',
      },
    }
  );
  const json = (await response.json()) as Promise<PrefecturesResponse>;
  return json;
};

export default async (req: VercelRequest, res: VercelResponse) => {
  const result = await getPrefectures();
  res.json(result);
};
