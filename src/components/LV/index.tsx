import React from 'react';
import styles from './index.module.scss';

export type ComponentProps = {
  level: Number;
};

function Component(props: ComponentProps) {
  return <p className={styles.lv + ' ' + styles[`lv${props.level}`] + ' ' + (props.level === 0 && styles.lvTop)}></p>;
}

export default Component;
