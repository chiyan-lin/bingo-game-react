import React from 'react';
import styles from './index.module.scss';

export type ComponentProps = {
  value: number;
  valueUpdate: Function
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
  }
  return (
    <div className={styles.switch + ' ' + 'row major-center minor-center'}>
      {list.map((item: any, idx) => {
        return (
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
