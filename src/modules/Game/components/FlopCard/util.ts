/* eslint-disable */

export const enum statusMap {
  PLACEHOLDER = -1,
  CLOSE = 0,
  OPEN = 1,
  TURNOVER = 2,
  MATCHED = 3,
}

export const isShowTurnover = (status: number) => {
  return status === statusMap.TURNOVER || status === statusMap.MATCHED;
};

export const disableClickCard = (item: number) => {
  return [statusMap.PLACEHOLDER, statusMap.TURNOVER, statusMap.MATCHED].includes(item);
};

export interface Card {
  status: number;
  value: number;
}
