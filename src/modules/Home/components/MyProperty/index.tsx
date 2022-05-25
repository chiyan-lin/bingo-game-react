/*
 * @Author: your name
 * @Date: 2022-05-21 10:50:00
 * @LastEditTime: 2022-05-22 13:20:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /bingo-game-react/src/modules/Home/components/MyProperty/index.tsx
 */
import React, { useState } from 'react';
import styles from './index.module.scss';
import NumberChange from '@/components/NumberChange';
import Password from '@/components/Password';

export type ComponentProps = {
  data: any;
};

function Component(props: ComponentProps) {
  const [coin, setCoin] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const addCoin = () => {
    setCoin(10);
  };

  return (
    <div className={['col major-between minor-start', styles.container].join(' ')}>
      <div className={['row major-between minor-center', styles.coin].join(' ')}>
        小币币&nbsp;
        <div className="coin"></div>&nbsp;&nbsp;
        <NumberChange number={coin} from={'home'} />
        &nbsp;
        <div onClick={() => setShowPassword(true)} className={['yellowBtn', styles.btn].join(' ')}>
          增加
        </div>
      </div>
      <div></div>
      {showPassword && (
        <Password
          onCancel={() => {
            setShowPassword(false);
          }}
          onSuccess={() => {
            addCoin();
          }}
        ></Password>
      )}
    </div>
  );
}

export default Component;
