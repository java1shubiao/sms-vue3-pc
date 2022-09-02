/**
 * @description 全局状态
 */
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
export const useAppStore = defineStore('app', () => {
  // state
  const countApp = ref(0);

  // actions
  const increment = () => {
    countApp.value++;
  };

  // getter
  const getCountApp = computed(() => countApp.value);

  return { countApp, increment, getCountApp };
});
