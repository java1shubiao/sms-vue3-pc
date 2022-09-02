import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useStore = defineStore('user', () => {
  // state
  const count = ref(0);

  // actions
  const increment = () => {
    count.value++;
  };

  // getter
  const getCount = computed(() => count.value);

  return { count, increment, getCount };
});
