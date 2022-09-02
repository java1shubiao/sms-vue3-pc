<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2><slot>this is a modal</slot></h2>
      <button @click="buttonClick">Close</button>
    </div>
  </teleport>
</template>
<script lang="ts" setup>
import { defineProps, toRefs, defineEmits, ref, defineExpose } from 'vue';
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});
const { isOpen } = toRefs(props);
console.log('isOpen', isOpen);
const emits = defineEmits(['close-modal']);
const buttonClick = () => {
  console.log('ff');
  emits('close-modal');
};
const name = ref('expose name value');
defineExpose({
  name
});
</script>
<style>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background: white;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>
