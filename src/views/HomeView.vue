<script lang="tsx">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
export default defineComponent({
  name: 'HomeView',
  setup() {
    const store = useStore();
    const { getCount } = storeToRefs(store);
    const changeCount = () => {
      store.$patch((state: any) => {
        state.count = state.count + 100;
      });
    };
    return () => (
      <div>
        <span>hello vue</span>
        <button onClick={store.increment}>我也加</button>
        <button onClick={changeCount}>直接改</button>
        <p>{getCount.value}</p>
      </div>
    );
  }
});
</script>
