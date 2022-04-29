import React from 'react';
import styles from './index.module.scss';

export type GiftItemProps = {
  data: Array<Object>;
};

function GiftItem(props: GiftItemProps) {
  const imgUrl = 'https://o-static.ihago.net/ikxd/6c5d15e3169b65ae040ff450a68537a3/coin.png';
  // console.log(props.data, ',,,,,');
  return (
    <div className={styles.container + ' ' + 'row major-ceter minor-center'}>
      {/* {props.data} */}
      {/* {props.data && props.data.map((item, idx) => {
        return <img src={imgUrl} className={styles.giftItem} key={idx} />;
      })} */}
      <span className={styles.tip}>随机奖励</span>
    </div>
  );
}

export default GiftItem;
