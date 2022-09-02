<script lang="tsx">
import { defineComponent, onMounted } from 'vue';
export default defineComponent({
  setup() {
    console.info('组件开始加载');
    onMounted(() => {
      console.info('组件挂载完成');
    });
    const result = '测试async';
    // const getResult: Promise<{ result: string }> = new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       result: '异步组件效果展示'
    //     });
    //   }, 300);
    // });

    // const { result } = await getResult;
    return () => <div>{result}</div>;
  }
});
</script>
