/*
 * @Author: your name
 * @Date: 2022-05-21 10:50:00
 * @LastEditTime: 2022-05-22 13:19:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /bingo-game-react/src/modules/Home/components/MyProperty/index.tsx
 */
import React from 'react';
import styles from './index.module.scss';
import Modal from '@/components/Modal';
import Btn from '../Btn';

export type ComponentProps = {
  onCancel: Function;
  onSuccess: Function;
};

function Component(props: ComponentProps) {
  return (
    <Modal onCancel={props.onCancel}>
      <div className={styles.container}>
        <h2>输入口令</h2>
        <input className={styles.input} type="text" />
        <div className={styles.pw}>
          <div>口令说明</div>
          <div>1. 找你男朋友获取口令</div>
          <div>
            2. 回答问题<span>[刷新]</span>
          </div>
        </div>
        <Btn type="small" onClick={() => props.onSuccess()}>
          确定
        </Btn>
      </div>
    </Modal>
  );
}

export default Component;
