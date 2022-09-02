import { FunctionalComponent } from 'vue';

// * loading组件不需要状态
const LoadingComponent: FunctionalComponent<any> = (props: any) => {
  console.info(props);
  return <div>loading...</div>;
};

export default LoadingComponent;
