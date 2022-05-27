/**
 * 棋盘生成函数 传入可点击的格子数 获取一个 nxn 的矩阵棋盘
 * 传入 4 ---》 2x2
 * 传入 6 ---》 3x3
 */
import { Card } from './interface';

export function getTotalList() {
  return new Array(10).fill(0).map((_, i) => i + 1);
}
export function getLimit(grid: number) {
  return grid * grid;
}
// 传进来一个数 x ，随机抽取 totalList 的 x 位
export function random(x: number) {
  const res = [];
  const totalList = getTotalList();
  for (let i = 0; i < x; i++) {
    // 抽牌
    const card = Math.floor(Math.random() * totalList.length);
    const item = totalList.splice(card, 1)[0];
    res.push(item);
    res.push(item);
  }
  return res;
}

export function getCheckBoard(grid: number, total: number): Card[][] {
  const limit = getLimit(grid);
  if (limit < total) {
    console.error('total larger than grid');
    return [];
  }
  let result: Card[][] = [];
  // 构造牌池
  let cardPool = random(total).concat(new Array(limit - total * 2).fill(0));
  // console.log('cardPool', cardPool);
  for (let row = 0; row < grid; row++) {
    result[row] = [];
    for (let col = 0; col < grid; col++) {
      // 抽牌
      const card = Math.floor(Math.random() * cardPool.length);
      const item = cardPool.splice(card, 1)[0];
      result[row][col] = {
        status: item === 0 ? -1 : 0,
        value: item,
      };
    }
  }
  return result;
}

// console.log('getCheckBoard(3, 3)', getCheckBoard(4, 6));
