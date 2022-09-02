<template>
  <img :src="result && result.message" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
// import { getDogImages } from '@/apis/index';
export default defineComponent({
  async setup() {
    // const rawData = await getDogImages();
    const rawData = {
      data: {
        message: 'fuck'
      }
    };
    return {
      result: rawData.data
    };
  }
});
</script>
