import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Svga from '@/common/lib/svga';
import biling from './img/biling.svga?url';

export type ComponentProps = {
  frontChild: any;
  backChild: any;
  isMatch: boolean;
};

function Component(props: ComponentProps) {
  const [showBiling, setBiling] = useState(false);
  const [showTurn, setShowTurn] = useState(false);
  const init = () => {
    let timer1: any = null;
    let timer2: any = null;
    timer1 = setTimeout(() => {
      setShowTurn(true);
      clearTimeout(timer1);
      timer1 = null;
    }, 50);
    if (props.isMatch) {
      timer2 = setTimeout(() => {
        setBiling(true);
        clearTimeout(timer2);
        timer2 = null;
      }, 500);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className={styles.turnover}>
      {props.isMatch && showBiling && (
        <Svga
          onEnd={() => setBiling(false)}
          className={styles.biling}
          url={biling}
          options={{ loop: 1, fillMode: 'forwards' }}
        />
      )}
      <div className={[styles.turn, showTurn && styles.turn__active].join(' ')}>
        <div className={[styles.turn__face, styles.turn__front].join(' ')}>{props.frontChild}</div>
        <div className={[styles.turn__face, styles.turn__back].join(' ')}>{props.backChild}</div>
      </div>
    </div>
  );
}

export default Component;
