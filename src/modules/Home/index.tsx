import React, { FC, useEffect, useState } from 'react';
// import SvgComponent from '@/components/SvgIcon';
import styles from './index.module.scss';
import { environmentVariable } from '@/common/utils/env';
import Banner from './components/Banner';
import LvSelect from './components/LvSelect';
import SwitchTab from './components/SwitchTab';
import LvDetail from './components/LvDetail';
import MyProperty from './components/MyProperty';
import Btn from '@/components/Btn';

const App: FC = () => {
  // useEffect(() => {
  //   console.log(`environmentVariable()`, environmentVariable());
  // }, []);

  const LvSelectData = [
    {
      coin: 100,
      flop_diamond: 100,
      flop_ticket: 1,
      grids: 4,
      last_lv_star: 0,
      lv: 0,
      reward_diamond: 100,
      rewards: [
        { amount: 1, item_id: 61, reward_type: 1 },
        { amount: 1, item_id: 18020105, reward_type: 5 },
        // { amount: 1, item_id: 18020020, reward_type: 5 },
        // { amount: 1, item_id: 18020014, reward_type: 5 },
        // { amount: 1, item_id: 18020008, reward_type: 5 }
      ],
    },
    {
      coin: 200,
      flop_diamond: 200,
      flop_ticket: 2,
      grids: 6,
      last_lv_star: 0,
      lv: 1,
      reward_diamond: 200,
      rewards: [
        { amount: 2, reward_id: 0, reward_type: 100 },
        { amount: 1, item_id: 61, reward_type: 1 },
        { amount: 1, item_id: 18020105, reward_type: 5 },
        { amount: 1, item_id: 18020014, reward_type: 5 },
        { amount: 1, item_id: 18020008, reward_type: 5 },
      ],
    },
    {
      coin: 200,
      flop_diamond: 200,
      flop_ticket: 2,
      grids: 8,
      last_lv_star: 2,
      lv: 2,
      reward_diamond: 200,
      rewards: [
        { amount: 2, reward_id: 0, reward_type: 100 },
        { amount: 1, item_id: 61, reward_type: 1 },
        { amount: 1, item_id: 18020105, reward_type: 5 },
        { amount: 1, item_id: 18020020, reward_type: 5 },
        { amount: 1, item_id: 18020008, reward_type: 5 },
      ],
    },
    {
      coin: 300,
      flop_diamond: 300,
      flop_ticket: 3,
      grids: 8,
      last_lv_star: 2,
      lv: 3,
      reward_diamond: 300,
      rewards: [
        { amount: 2, reward_id: 0, reward_type: 100 },
        { amount: 1, item_id: 1222, reward_type: 0 },
      ],
    },
    {
      coin: 400,
      flop_diamond: 400,
      flop_ticket: 4,
      grids: 10,
      last_lv_star: 2,
      lv: 4,
      reward_diamond: 400,
      rewards: [
        { amount: 2, reward_id: 0, reward_type: 100 },
        { amount: 1, item_id: 1222, reward_type: 0 },
      ],
    },
    {
      coin: 500,
      flop_diamond: 500,
      flop_ticket: 5,
      grids: 12,
      last_lv_star: 3,
      lv: 5,
      reward_diamond: 100,
      rewards: [
        { amount: 1, item_id: 1222, reward_type: 0 },
        { amount: 2, reward_id: 0, reward_type: 100 },
      ],
    },
    {
      coin: 600,
      flop_diamond: 600,
      flop_ticket: 6,
      grids: 14,
      last_lv_star: 3,
      lv: 6,
      reward_diamond: 600,
      rewards: [
        { amount: 1, item_id: 1222, reward_type: 0 },
        { amount: 2, reward_id: 0, reward_type: 100 },
      ],
    },
  ];

  const [tab, setTab] = useState(0);
  const [lv, setLv] = useState(0);

  return (
    <div className={styles.container + ' ' + 'col major-starts minor-center'}>
      <Banner></Banner>
      <main className={styles.main + ' ' + 'greImgdBg'}>
        <SwitchTab value={tab} valueUpdate={setTab}></SwitchTab>
        <LvSelect data={LvSelectData} select={lv} updateSelect={setLv}></LvSelect>
        <LvDetail
          data={LvSelectData.map((item) => item.rewards)}
          cost={LvSelectData.map((item) => item.coin)}
          selected={lv}
        ></LvDetail>
        <Btn className={styles.btn}>开始游戏</Btn>
        <MyProperty data={{ coin: 2 }}></MyProperty>
      </main>
      <h3>Welcome to BingoGame，I make it for Kata</h3>
    </div>
  );
};

export default App;
