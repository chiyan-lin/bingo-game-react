import React, { useState } from 'react';
import { useImmer } from "use-immer";
import styles from './index.module.scss';

import Dashborad from './components/Dashboard';
import Star from './components/Star';
import FlopCard from './components/FlopCard';
import Reward from './components/Reward';

export type ComponentProps = {};

function Component(props: ComponentProps) {
  const setItem = () => ({
    isMatch: false,
    status: 0,
    index: 1,
  });
  const [gameData, setGameData] = useImmer([
    [setItem(), setItem(), setItem()],
    [setItem(), setItem(), setItem()],
    [setItem(), setItem(), setItem()],
  ])
  return (
    <main className={[styles.game, styles.gameAdvance].join(' ')}>
      <Dashborad lv={2} ticket={2} coin={5} onBack={() => {}} onReset={() => {}}></Dashborad>
      <Star limit={5} type={2} lv={2} star={2}></Star>
      <FlopCard type={1} limit={3} gameData={gameData} setGameData={setGameData}></FlopCard>
      <Reward gift={[{}, {}, {}]}></Reward>
    </main>
  );
}

export default Component;
