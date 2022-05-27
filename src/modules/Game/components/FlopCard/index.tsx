import React, { useEffect } from 'react';
import styles from './index.module.scss';
import Turnover from './components/Turnover';
import { isShowTurnover, statusMap, disableClickCard } from '../../common/interface';

export type ComponentProps = {
  limit: number;
  gameData: any[];
  children?: any;
  type: number;
  setGameData: Function;
};
interface FlopCardCache {
  row: number;
  col: number;
  status: number;
  value: number;
}

let flopCardCache: FlopCardCache | null = null;

function Component(props: ComponentProps) {
  const onClickCard = (row: number, col: number) => {
    // setGameData
    // console.log('onClick', row, col);
    const clickStatus = props.gameData[row][col].status;
    // console.log('statusMap', statusMap.CLOSE, statusMap.OPEN, 'clickStatus', clickStatus);
    if (disableClickCard(clickStatus)) return;
    // console.log('clickStatus', clickStatus);
    props.setGameData((data: any) => {
      const { status, value } = data[row][col];
      // 如果当前有 value ，翻一次不扣币
      // 如果当前 status 为 1 再点一次 status 为 0
      if (status === statusMap.OPEN) {
        data[row][col].status = statusMap.CLOSE;
        flopCardCache = null;
        return;
      }
      // console.log('the flopCardCache', flopCardCache);
      // 如果当前是 0 而且没缓存
      if (status === statusMap.CLOSE && !flopCardCache) {
        // console.log('wocao');
        data[row][col].status = statusMap.OPEN;
        flopCardCache = {
          row,
          col,
          status,
          value,
        };
        return;
      }
      // 如果当前是 0 有缓存
      if (status === statusMap.CLOSE && flopCardCache) {
        data[row][col].status = statusMap.OPEN;
        // 同一个 value 的牌
        if (data[row][col].value === flopCardCache.value) {
          setTimeout(() => {
            props.setGameData((data: any) => {
              data[row][col].status = statusMap.MATCHED;
              data[(flopCardCache as FlopCardCache)?.row][
                (flopCardCache as FlopCardCache)?.col
              ].status = statusMap.MATCHED;
              flopCardCache = null;
            });
          }, 666);
        } else {
          setTimeout(() => {
            props.setGameData((data: any) => {
              data[row][col].status = statusMap.TURNOVER;
              data[(flopCardCache as FlopCardCache)?.row][
                (flopCardCache as FlopCardCache)?.col
              ].status = statusMap.TURNOVER;
              setTimeout(() => {
                props.setGameData((data: any) => {
                  data[row][col].status = statusMap.CLOSE;
                  data[(flopCardCache as FlopCardCache)?.row][
                    (flopCardCache as FlopCardCache)?.col
                  ].status = statusMap.CLOSE;
                  flopCardCache = null;
                });
              }, 1345);
            });
          }, 666);
        }
      }
    });
  };
  return (
    <div className={[styles.container, styles[`ct${props.limit}`]].join(' ')}>
      <div
        className={[
          styles.flop,
          styles[`flop${props.limit}`],
          'col major-between minor-center',
        ].join(' ')}
      >
        {props.gameData.map((rowItem, rowId) => {
          return (
            <div className={[styles.row, 'row major-between minor-center'].join(' ')} key={rowId}>
              {rowItem.map((colItem: any, colIdx: number) => {
                return (
                  <div
                    className={[styles.col, styles[`block${props.limit}`]].join(' ')}
                    key={colIdx + '-' + rowId + '-' + colItem.status}
                  >
                    <div
                      className={[
                        // colItem.status === 2 && styles.cardHidden,
                        styles.colIteme,
                        styles[`colStatus${colItem.status}${props.type}`],
                      ].join(' ')}
                      onClick={() => onClickCard(rowId, colIdx)}
                    >
                      {isShowTurnover(colItem.status) && (
                        <Turnover
                          isMatch={colItem.status === statusMap.MATCHED}
                          frontChild={
                            <div
                              className={[styles.colItemf, styles[`colItemf${props.type}`]].join(
                                ' ',
                              )}
                            ></div>
                          }
                          backChild={
                            <div
                              className={[styles.colItemb, styles[`colItemb${colItem.value}`]].join(
                                ' ',
                              )}
                            ></div>
                          }
                        ></Turnover>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Component;
