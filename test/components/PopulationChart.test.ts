import { mount } from '@vue/test-utils';
import { ref, reactive, nextTick } from 'vue';
import PopulationChart from '~/components/PopulationChart';

const state = reactive({
  selectedPrefCodes: [1],
  totalPopulationDataSets: [{ prefCode: 1, data: [] }],
  prefectures: [{ prefCode: 1, prefName: '' }],
});

vi.mock('~/store', () => ({
  useStore: vi.fn(() => ({
    state: state,
  })),
}));

describe('PopulationChart', async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('snapshot', () => {
    const wrapper = mount(PopulationChart);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('選択都道府県が一つも無い時グラフを表示しない', async () => {
    const wrapper = mount(PopulationChart);
    state.selectedPrefCodes.pop();
    await nextTick();
    expect(wrapper.text()).toContain('都道府県を選択してください。');
  });
});
