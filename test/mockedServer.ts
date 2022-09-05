import { rest } from 'msw';

const SERVER_ENDPOINT = import.meta.env.VITE_API_SERVER_ENDPOINT;

const prefectures = {
  message: null,
  result: [
    {
      prefCode: 1,
      prefName: '北海道',
    },
    {
      prefCode: 2,
      prefName: '青森県',
    },
    {
      prefCode: 3,
      prefName: '岩手県',
    },
    {
      prefCode: 4,
      prefName: '宮城県',
    },
  ],
};

const populationCompositionPerYear = {
  message: null,
  result: {
    boundaryYear: 2015,
    data: [
      {
        label: '総人口',
        data: [
          {
            year: 1980,
            value: 12817,
          },
          {
            year: 1985,
            value: 12707,
          },
          {
            year: 1990,
            value: 12571,
          },
        ],
      },
    ],
  },
};

export const resasApiHandler = [
  rest.get(`${SERVER_ENDPOINT}prefectures`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(prefectures));
  }),
  rest.get(
    `${SERVER_ENDPOINT}population/composition/perYear`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(populationCompositionPerYear));
    }
  ),
];
