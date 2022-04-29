import React from 'react';
import styles from './index.module.scss';

export type ComponentProps = {
  value: number;
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

  return (
    <div className={styles.switch + ' ' + 'row major-center minor-center'}>
      {list.map((item: any, idx) => {
        return (
          <div
            key={item.title}
            className={(props.value === idx && styles.active) + ' ' + styles.switchItem}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
}

export default Banner;
