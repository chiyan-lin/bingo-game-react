/**
 * 棋盘生成函数 传入可点击的格子数 获取一个 nxn 的矩阵棋盘
 * 传入 4 ---》 2x2
 * 传入 6 ---》 3x3
 */

export function getLimit (grid) {
  return Math.ceil(Math.sqrt(grid))
}
export function getCheckBoard (grid) {
  console.log('get grid', grid)
  if (!grid) {
    console.error('参数 grid 没传', grid)
  }
  const limit = getLimit(grid)
  let result = []
  // 构造牌池
  let cardPool = [...new Array(grid).fill(1), ...new Array(limit * limit - grid).fill(0)]
  for (let row = 0; row < limit; row++) {
    result[row] = []
    for (let col = 0; col < limit; col++) {
      // 抽牌
      result[row][col] = cardPool.splice(Math.floor(Math.random() * cardPool.length), 1)[0]
    }
  }
  return result
}
