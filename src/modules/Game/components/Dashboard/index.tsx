/*
 * @Author: your name
 * @Date: 2022-05-22 16:06:54
 * @LastEditTime: 2022-05-22 16:14:31
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /bingo-game-react/src/modules/Game/components/Dashboard/index.tsx
 */
import React from 'react';
import styles from './index.module.scss';
import LV from '@/components/LV';
import NumberChange from '@/components/NumberChange';

export type ComponentProps = {
  onBack: Function;
  onReset: Function;
  lv: number;
  ticket: number;
  coin: number;
};

function Component(props: ComponentProps) {
  return (
    <div className={['row major-between minor-start', styles.header].join(' ')}>
      {/* eslint-disable-next-line */}
      <div onClick={() => props.onBack()} className={styles.back}></div>
      <div className={[styles.score, styles.diamond].join(' ')}>
        {props.coin && <NumberChange number={props.coin} from="game"></NumberChange>}
      </div>
      <div className={[styles.score, styles.coin].join(' ')}>{props.ticket}</div>
      {/* eslint-disable-next-line */}
      <div className={styles.rule} onClick={() => props.onReset()}></div>
      <LV className={[styles.lv, props.lv === 0 && styles.lv0].join(' ')} level={props.lv} />
    </div>
  );
}

export default Component;
