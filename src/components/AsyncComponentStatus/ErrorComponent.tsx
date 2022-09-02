import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorComponent',
  setup() {
    return () => <div>loading asyncComponent Error...</div>;
  }
});
