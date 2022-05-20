import React from 'react';
import styles from './index.module.scss';
import LV from '@/components/LV';

export type ComponentProps = {
  level: Number;
  star: Number;
  limit: Number;
  lock: Boolean;
  select: Number;
  onClick: Function;
};

function Component(props: ComponentProps) {
  return (
    <div onClick={() => props.onClick(props.level)} className={styles.container}>
      <div
        className={
          styles.level +
          ' ' +
          (props.lock ? styles.levelLock : styles.levelHigh) +
          ' ' +
          (props.select === props.level && !props.lock && styles.levelLow)
        }
      >
        <LV level={props.level} />
      </div>
      <div className={styles.starWrap}>
        {props.lock ? (
          <div className={styles.lock}></div>
        ) : (
          new Array(props.limit).fill(1).map((_, idx) => {
            return (
              <div
                className={
                  styles.star +
                  ' ' +
                  (props.limit === 4 && styles.star14) +
                  ' ' +
                  (idx <= props.star && styles.starActive)
                }
                key={idx}
              ></div>
            );
          })
        )}
      </div>
      {props.select === props.level && <div className={styles.triangle + ' triangle'}></div>}
    </div>
  );
}

export default Component;
