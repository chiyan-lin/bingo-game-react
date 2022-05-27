import React from 'react';
import styles from './index.module.scss';
import Star from '../Star';
import Reward from '../Reward';

export type ComponentProps = {
  data: any;
  reward: object[];
  star: number;
};

function Component(props: ComponentProps) {
  console.log(props);
  return (
    <div className={styles.container}>
      <div className={styles.win}>
        <div className={styles.winImg}></div>
        <Star limit={props.data.limit} star={props.star} type={1} className={styles.star} />
        <p className={styles.lv}>Lv. {props.data.lv}</p>
        <p className={styles.tip}>恭喜</p>
        <Reward className={styles.reward} data={props.reward} type="win" />
        <div className="row major-center minor-center">
          <div className={[styles.btn, styles.back].join(' ')}>返回首页</div>
          <div className={[styles.btn, styles.continue].join(' ')}>开启下一关</div>
        </div>
      </div>
    </div>
  );
}

export default Component;
