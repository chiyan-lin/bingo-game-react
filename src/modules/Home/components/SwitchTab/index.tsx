/*
 * @Author: your name
 * @Date: 2022-05-21 10:16:08
 * @LastEditTime: 2022-05-22 10:45:45
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /bingo-game-react/src/modules/Home/components/SwitchTab/index.tsx
 */
import React from 'react';
import styles from './index.module.scss';

export type ComponentProps = {
  value: number;
  valueUpdate: Function;
};

function Banner(props: ComponentProps) {
  const list = [
    {
      title: '普通',
    },
    {
      title: '高级',
    },
  ];
  const clickHandle = (val: number) => {
    props.valueUpdate(val);
  };
  return (
    <div className={styles.switch + ' ' + 'row major-center minor-center'}>
      {list.map((item: any, idx) => {
        return (
          // eslint-disable-next-line
          <div
            key={item.title}
            className={(props.value === idx && styles.active) + ' ' + styles.switchItem}
            onClick={() => clickHandle(idx)}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
}

export default Banner;
