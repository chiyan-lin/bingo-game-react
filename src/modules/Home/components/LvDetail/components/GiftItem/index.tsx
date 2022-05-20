import React from 'react';
import styles from './index.module.scss';

export type GiftItemProps = {
  data: Array<Object>;
};

function GiftItem(props: GiftItemProps) {
  const imgUrl = 'https://o-static.ihago.net/ikxd/6c5d15e3169b65ae040ff450a68537a3/coin.png';
  return (
    <div className="col major-center minor-center">
      <div className={styles.container + ' ' + 'row major-center minor-start'}>
        {props?.data?.map((item, idx) => {
          return <img alt="pic" src={imgUrl} className={styles.giftItem} key={idx} />;
        })}
      </div>
      <span className={styles.tip}>随机奖励</span>
    </div>
  );
}

export default GiftItem;
