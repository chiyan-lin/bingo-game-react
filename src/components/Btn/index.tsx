import React from 'react';
import styles from './index.module.scss';

export type BtnProps = {
  type: string;
  disable: boolean;
  children: any;
};

function Btn(props: BtnProps) {
  return (
    <div
      className={
        styles.container + ' ' + props.type === 'small'
          ? `${styles.btns + ' ' + props.disable && styles.btns_d}`
          : `${styles.btn + ' ' + props.disable && styles.btn_d}`
      }
    >
      {props.children}
    </div>
  );
}

export default Btn;
