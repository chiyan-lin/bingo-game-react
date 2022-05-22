/*
 * @Author: your name
 * @Date: 2022-05-21 10:16:08
 * @LastEditTime: 2022-05-22 13:13:10
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /bingo-game-react/config/plugins/eslint.ts
 */
import eslint from 'vite-plugin-eslint';
import checker from 'vite-plugin-checker';
/**
 * @description 对eslint的支持，在开发模式下，自动会开启检测
 */
export default function configEslint() {
  return [
    // eslint({ include: ['./src/**/*.ts', './src/**/*.tsx'] }),
    // 在 Vite HMR 叠加层和终端控制台中提示错误
    checker({
      typescript: true,
      eslint: {
        files: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx'],
      },
    }),
  ];
}
