import { mount } from '@vue/test-utils';
import App from '../src/App.vue';

test('mount component', async () => {
  expect(App).toBeTruthy();

  const wrapper = mount(App);

  expect(wrapper.text()).toContain('フロントエンドコーディング試験');
  expect(wrapper.html()).toMatchSnapshot();
});
