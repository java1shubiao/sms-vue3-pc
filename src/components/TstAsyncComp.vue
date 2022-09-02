<script lang="tsx">
import { defineComponent, defineAsyncComponent } from 'vue';
import ErrorComponent from '@/components/AsyncComponentStatus/ErrorComponent';
import LoadingComponent from '@/components/AsyncComponentStatus/LoadingComponent';
// import AsyncShowComp from '@/components/AsyncShow.vue';
const AsyncShow = defineAsyncComponent({
  loader: async () => {
    await new Promise((resolve) => {
      setTimeout(() => resolve(1), 3000);
    });
    return import('@/components/AsyncShow.vue');
  },
  // 加载中的组件
  loadingComponent: LoadingComponent,
  // TODO 展示加载组件前的延迟时间，默认为 200ms(目前看来似乎没起作用?)
  delay: 500,
  // 加载失败时要使用的组件
  errorComponent: ErrorComponent,
  // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件（默认为Infinity（即永不超时，单位 ms））
  timeout: 3000
});
export default defineComponent({
  name: 'HomeView',
  components: {
    AsyncShow
  },
  setup() {
    return () => (
      <div>
        <span>hello vue</span>
        <AsyncShow />
      </div>
    );
  }
});
</script>
