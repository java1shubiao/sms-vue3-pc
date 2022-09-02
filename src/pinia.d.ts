/**
 * @description 扩展pinia, 添加router
 */
import 'pinia';

import { Router } from 'vue-router';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $router: Router;
  }
}
