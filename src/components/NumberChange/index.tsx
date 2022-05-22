/*
 * @Author: your name
 * @Date: 2022-05-21 10:16:08
 * @LastEditTime: 2022-05-22 13:21:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /bingo-game-react/src/components/NumberChange/index.tsx
 */
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Svga from '@/common/lib/svga';
import home from './img/home.svga?url';
import game from './img/game.svga?url';

export type ComponentProps = {
  number: number;
  from: string;
};

function Component(props: ComponentProps) {
  const [count, setCount] = useState(props.number);
  const [showSvga, setSvga] = useState(false);
  const url = props.from === 'home' ? home : game;
  const options = { loop: 1, fillMode: 'forwards' };

  const closeSvga = () => {
    setSvga(false);
    setCount(props.number);
  };
  useEffect(() => {
    setSvga(true);
  }, [props.number]);

  return (
    <div>
      {showSvga && (
        <Svga
          className={[styles.coin, props.from === 'home' ? styles.home : styles.game].join(' ')}
          url={url}
          options={options}
          onEnd={closeSvga}
        ></Svga>
      )}
      {count}
    </div>
  );
}

export default Component;
