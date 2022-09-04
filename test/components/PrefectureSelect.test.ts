import { mount } from '@vue/test-utils';
import PrefectureSelect from '~/components/PrefectureSelect.vue';

const mockedGetPrefectures = vi.fn();
const mockedUpdateTotalPopulationDataSets = vi.fn();

vi.mock('~/store', () => ({
  useStore: vi.fn(() => ({
    state: { prefectures: [{ prefCode: 1, prefName: '北海道' }] },
    getPrefectures: mockedGetPrefectures,
    updateTotalPopulationDataSets: mockedUpdateTotalPopulationDataSets,
  })),
}));

describe('PrefectureSelect', async () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('snapshot', () => {
    const wrapper = mount(PrefectureSelect);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('マウント後都道府県APIが呼ばれる', () => {
    mount(PrefectureSelect);
    expect(mockedGetPrefectures).toHaveBeenCalledTimes(1);
  });

  test('都道府県を選択するとstoreのupdateTotalPopulationDataSetsメソッドが実行される', () => {
    const wrapper = mount(PrefectureSelect);
    expect(mockedUpdateTotalPopulationDataSets).toHaveBeenCalledTimes(0);
    wrapper.find<HTMLInputElement>('#pref-1').setValue('true');
    expect(mockedUpdateTotalPopulationDataSets).toHaveBeenCalledTimes(1);
  });
});
