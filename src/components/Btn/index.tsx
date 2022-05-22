/*
 * @Author: your name
 * @Date: 2022-05-21 10:16:08
 * @LastEditTime: 2022-05-22 13:13:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /bingo-game-react/src/components/Btn/index.tsx
 */
import React from 'react';
import styles from './index.module.scss';

export type BtnProps = {
  type?: string;
  disable?: boolean;
  children?: any;
  className?: string;
  onClick?: Function;
};

function Btn(props: BtnProps) {
  return (
    <div
      onClick={() => props.onClick && props.onClick()}
      className={
        props.className +
        ' ' +
        styles.container +
        ' ' +
        (props.type === 'small'
          ? `${styles.btns + ' ' + (props.disable && styles.btns_d)}`
          : `${styles.btn + ' ' + (props.disable && styles.btn_d)}`)
      }
    >
      {props.children}
    </div>
  );
}

export default Btn;
