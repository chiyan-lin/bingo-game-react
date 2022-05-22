/*
 * @Author: your name
 * @Date: 2022-05-21 10:16:08
 * @LastEditTime: 2022-05-22 10:45:55
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /bingo-game-react/src/modules/Home/components/LvSelect/index.tsx
 */
import React from 'react';
// import reactCSS from 'reactcss';
import styles from './index.module.scss';
import LvItem from './components/LvItem';
// const styles = reactCSS({
//   default: {
//     contianer: {
//       position: 'relative',
//       'z-index': '9',
//     },
//     lvWrap: {
//       width: '560px',
//       height: '150px',
//       margin: '0 auto',
//       overflow: 'auto',
//       position: 'relative',
//     },
//     lvWrapScroll: {
//       width: 'auto',
//       'white-space': 'nowrap',
//       height: '100%',
//       position: 'relative',
//     },
//     tip: {
//       width: '442px',
//       color: '#fff',
//       margin: '16px auto',
//       'min-height': '80px',
//       'text-align': 'center',
//     },
//   },
// });

export type LvSelectProps = {
  data: Array<Object>;
  select: number;
  updateSelect: Function;
};

function LvSelect(props: LvSelectProps) {
  // function slide (i: number) {
  //   this.$emit('on-change', i)
  //   this.slideTo(i)
  // }

  return (
    <div className={styles.contianer}>
      <p
        className={
          styles.tip
            ? styles.tip + ' row major-center minor-center'
            : 'row major-center minor-center'
        }
      >
        完成BINGO即可获得奖励
      </p>
      <div className={styles.lvWrap}>
        <div className={styles.lvWrapScroll}>
          {props.data?.map((conf: any, idx) => {
            return (
              <LvItem
                onClick={(val: number) => {
                  props.updateSelect(val);
                }}
                select={props.select}
                limit={conf.limit}
                lock={conf.lock}
                level={conf.lv}
                star={conf.star}
                key={idx}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LvSelect;
