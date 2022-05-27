import React, { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import styles from './index.module.scss';

import Dashborad from './components/Dashboard';
import Star from './components/Star';
import FlopCard from './components/FlopCard';
import Reward from './components/Reward';
import { getCheckBoard } from './common/config'
import { statusMap } from './common/interface'

export type ComponentProps = {};

function Component(props: ComponentProps) {
  // const setItem = (status = 0) => ({
  //   status: status,
  //   value: 0,
  // });
  const [gameData, setGameData] = useImmer(getCheckBoard(3, 3));
  useEffect(() => {
    const isDone = gameData.every(row => {
      return row.every(item => {
        return !item.value || item.status === statusMap.MATCHED
      })
    })
    console.log('game result', gameData, isDone);
  }, [gameData])
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
