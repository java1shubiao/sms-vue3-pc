<template>
  <img alt="Vue logo" src="../assets/images/logo.png" />
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <h1>{{ greetings }}</h1>
  <p>{{ error }}</p>
  <Suspense>
    <template #default>
      <div>
        <async-show />
        <dog-show />
      </div>
    </template>
    <template #fallback>
      <h1>Loading !...</h1>
    </template>
  </Suspense>
  <button @click="openModal">Open Modal</button><br />
  <modal :isOpen="modalIsOpen" @close-modal="onModalClose">
    My Modal777 !!!!</modal
  >
  <h1 v-if="loading">Loading!...</h1>
  <img v-if="loaded" :src="result?.[0].url" />
  <h1>X: {{ x }}, Y: {{ y }}</h1>
  <button @click="increase">👍+1</button><br />
  <button @click="updateGreeting">Update Title</button>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  reactive,
  toRefs,
  watch,
  onErrorCaptured
} from 'vue';
import useMousePosition from '../hooks/useMousePosition';
import useURLLoader from '../hooks/useURLLoader';
import modal from './Modal.vue';
import AsyncShow from './AsyncShow.vue';
import DogShow from './DogShow.vue';
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}
// interface DogResult {
//   message: string;
//   status: string;
// }
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
const error = ref(null);
onMounted(() => {
  console.log('valuettttttttttttttttt', modal);
});

onErrorCaptured((e: any) => {
  error.value = e;
  return true;
});

const data: DataProps = reactive({
  count: 0,
  increase: () => {
    data.count++;
  },
  double: computed(() => data.count * 2)
});
const { x, y } = useMousePosition();
const { result, loading, loaded } = useURLLoader<CatResult[]>(
  'https://api.thecatapi.com/v1/images/search?limit=1'
);
watch([result, () => data.count], () => {
  if (result.value) {
    console.log('value', result.value[0].url, data.count);
  }
});
const greetings = ref('');
const updateGreeting = () => {
  greetings.value += 'Hello! ';
};
const { count, double, increase } = toRefs(data);
const modalIsOpen = ref(false);
const openModal = () => {
  modalIsOpen.value = true;
};
const onModalClose = () => {
  modalIsOpen.value = false;
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  font-size: 5rem;
}
button {
  font-size: 3rem;
}
</style>
