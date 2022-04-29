import { CSSOptions } from 'vite';
import pluginPx2rem from 'postcss-plugin-px2rem';
/**
 * @description css样式配置
 */

const cssOption: CSSOptions = {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,
    },
    scss: {
      additionalData: '@import "./src/common/css/global.scss";',
    },
  },
  postcss: {
    plugins: [pluginPx2rem({ rootValue: 72 })],
  }
};
export default cssOption;
