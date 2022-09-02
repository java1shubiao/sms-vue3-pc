<template>
  <div class="about">
    <h1>This is an about page 1111</h1>
    <LoadingComponent />
    <ErrorComponent />
    <button @click="increment">猛猛加</button>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { defineComponent } from 'vue';
import LoadingComponent from '@/components/AsyncComponentStatus/LoadingComponent';
import ErrorComponent from '@/components/AsyncComponentStatus/ErrorComponent';
export default defineComponent({
  name: 'AboutView',
  components: {
    LoadingComponent,
    ErrorComponent
  },
  setup() {
    const store = useStore();
    console.info(store);
    return {
      increment: store.increment
    };
  }
});
</script>
