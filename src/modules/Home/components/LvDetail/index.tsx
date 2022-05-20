import React from 'react';
import styles from './index.module.scss';
import GiftItem from './components/GiftItem';

export type ComponentProps = {
  selected: any;
  data: Array<Object>;
  cost: Array<Object>;
};

function Component(props: ComponentProps) {
  const selectdDate: any = props.data[props.selected];
  const coin: any = selectdDate && selectdDate[0];
  const gift: any = selectdDate && selectdDate.slice(1);
  return (
    <div className={styles.container + ' ' + 'greGradBg'}>
      <div className={'row major-center minor-center'}>
        {coin.amount && (
          <div className="row major-center minor-center">
            <GiftItem data={[coin]} />
            {gift.length && <span className={styles.plug}>+</span>}
          </div>
        )}
        {gift.length && <GiftItem data={gift} />}
      </div>
    </div>
  );
}

export default Component;
