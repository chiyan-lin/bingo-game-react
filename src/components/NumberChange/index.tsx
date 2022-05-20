import React, { useState } from 'react';
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
  const [showCoin, setShowCoin] = useState(false);
  const url = props.from === 'home' ? home : game;
  const options = { loop: 1, fillMode: 'forwards' };

  const closeSvga = () => {
    setShowCoin(false);
    setCount(props.number);
  };
  return (
    <div>
      {showCoin && <Svga url={url} options={options} onEnd={closeSvga}></Svga>}
      {count}
    </div>
  );
}

export default Component;
