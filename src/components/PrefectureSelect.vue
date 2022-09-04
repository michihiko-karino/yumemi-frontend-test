<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '~/store';

export default defineComponent({
  setup() {
    const { state, getPrefectures, updateTotalPopulationDataSets } = useStore();
    getPrefectures();

    return { state, updateTotalPopulationDataSets };
  },
});
</script>

<template>
  <div class="root">
    <h2>都道府県</h2>
    <ul class="select-fields">
      <li v-for="prefecture in state.prefectures!" :key="prefecture.prefCode">
        <input
          :id="`pref-${prefecture.prefCode}`"
          v-model="state.selectedPrefCodes"
          type="checkbox"
          class="checkbox"
          :value="prefecture.prefCode"
          @change="updateTotalPopulationDataSets(prefecture.prefCode)"
        /><label :for="`pref-${prefecture.prefCode}`" class="label">{{
          prefecture.prefName
        }}</label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.root {
  padding: 0 20px 40px;
}
.select-fields {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  list-style: none;
  padding-inline-start: 0;
}
.checkbox {
  width: 20px;
  height: 20px;
  margin-right: 4px;
  vertical-align: text-bottom;
}
.label {
  font-size: 18px;
  margin-right: 10px;
}
</style>
