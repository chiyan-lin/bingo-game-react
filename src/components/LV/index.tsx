import React from 'react';
import styles from './index.module.scss';

export type ComponentProps = {
  level: Number;
  className?: string;
};

function Component(props: ComponentProps) {
  return (
    <p
      className={
        styles.lv +
        ' ' +
        styles[`lv${props.level}`] +
        ' ' +
        (props.level === 0 && styles.lvTop) +
        ' ' +
        props.className
      }
    ></p>
  );
}

export default Component;
