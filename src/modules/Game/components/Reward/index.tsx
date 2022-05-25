import React from 'react';
import styles from './index.module.scss';

export type ComponentProps = {
  gift: object[];
};

function Component(props: ComponentProps) {
  return (
    <div className={['row major-center minor-start', styles.container].join(' ')}>
      {props.gift.map((item, idx) => {
        return (
          <div
            key={idx}
            className={[
              styles.item,
              // type === 'red' ? styles.red : styles.green,
              'row major-center minor-center',
            ].join(' ')}
          >
            {/* <Gift className={styles.gift}></Gift> */}
            <p className={styles.amount}>x 20</p>
          </div>
        );
      })}
    </div>
  );
}

export default Component;
