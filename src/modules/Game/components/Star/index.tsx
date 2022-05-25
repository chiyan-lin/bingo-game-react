import React from 'react';
import styles from './index.module.scss';
import qPng from './img/q.png';

export type ComponentProps = {
  star: number;
  limit: number;
  type: number;
  // showTip: boolean;
  lv: number;
};

function Component(props: ComponentProps) {
  return (
    <div>
      <div
        className={[
          props.type === 1 ? styles.star1 : styles.star2,
          styles.star,
          'row major-center minor-center',
        ].join(' ')}
      >
        {new Array(props.limit).fill(0).map((_, i) => {
          return (
            <div
              key={i}
              className={[styles.disable, i <= props.star && styles.active].join(' ')}
            ></div>
          );
        })}
        &nbsp;
        <img src={qPng} className={styles.que} alt="" />
      </div>
      <p className={styles.tip}>消耗xxxxx</p>
    </div>
  );
}

export default Component;
