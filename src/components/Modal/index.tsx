/*
 * @Author: your name
 * @Date: 2022-05-22 11:30:54
 * @LastEditTime: 2022-05-22 12:47:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /bingo-game-react/src/common/lib/modal /index.tsx
 */
import React, { useEffect } from 'react';
import styles from './index.module.scss';

export type ComponentProps = {
  children?: any;
  onCancel: Function;
};

function Component(props: ComponentProps) {
  let scrollTop = 0;
  const close = () => {
    props.onCancel && props.onCancel();
  };
  const toScrollTop = (scrollTop: number) => {
    document.body.scrollTop = scrollTop;
    document.documentElement.scrollTop = scrollTop;
  };
  const getScrollTop = () => {
    return document.body.scrollTop || document.documentElement.scrollTop || 0;
  };
  useEffect(() => {
    // eslint-disable-next-line
    scrollTop = getScrollTop() as number;
    // todo: check 使body脱离文档流
    document.body.classList.add('no-scroll');
    // 把脱离文档流的body拉上去！否则页面会回到顶部！
    document.body.style.top = `${-scrollTop}px`;
    return () => {
      // body又回到了文档流中（我胡汉三又回来啦！）
      document.body.classList.remove('no-scroll');
      // 滚回到老地方！
      toScrollTop(scrollTop);
    };
  });
  return (
    <div className={styles.modal}>
      <div className={[styles.modal__wrap, 'greImgdBg'].join(' ')}>
        {props.children}
        {/* eslint-disable-next-line */}
        <span className={styles.modal__close} onClick={() => close()}></span>
      </div>
    </div>
  );
}

export default Component;
