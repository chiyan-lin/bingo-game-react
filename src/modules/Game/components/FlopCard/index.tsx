import React from 'react';
import styles from './index.module.scss';
import Turnover from './components/Turnover';

export type ComponentProps = {
  limit: number;
  gameData: any[];
  children?: any;
  type: number;
};

function Component(props: ComponentProps) {
  const onClickCard = (a, b) => {
    console.log(a, b);
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
                    key={colIdx}
                  >
                    {/* eslint-disable-next-line */}
                    <div
                      className={[
                        colItem.isMatch && styles.cardHidden,
                        styles.colIteme,
                        styles[`colStatus${colItem.status}${props.type}`],
                        colItem.index === false && styles[`colEmpty${props.type}`],
                      ].join(' ')}
                      onClick={() => onClickCard(rowId, colIdx)}
                    >
                      {colItem.status === 2 && (
                        <Turnover
                          isMatch={colItem.isMatch}
                          frontChild={
                            <div
                              className={[styles.colItemf, styles[`colItemf${props.type}`]].join(
                                ' ',
                              )}
                            ></div>
                          }
                          backChild={
                            <div
                              className={[styles.colItemb, styles[`colItemb${props.type}`]].join(
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
