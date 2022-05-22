import React from 'react';
import styles from './index.module.scss';

import Dashborad from './components/Dashboard';
import Star from './components/Star';
import FlopCard from './components/FlopCard';

export type ComponentProps = {};

function Component(props: ComponentProps) {
  const setItem = () => ({
    isMatch: false,
    status: 2,
    index: false,
  });
  const gameData = [
    [setItem(), setItem(), setItem()],
    [setItem(), setItem(), setItem()],
    [setItem(), setItem(), setItem()],
  ];
  return (
    <main className={[styles.game, styles.gameAdvance].join(' ')}>
      <Dashborad lv={2} ticket={2} coin={5} onBack={() => {}} onReset={() => {}}></Dashborad>
      <Star limit={5} type={2} lv={2} star={2}></Star>
      <FlopCard type={1} limit={9} gameData={gameData}></FlopCard>
    </main>
  );
}

export default Component;
