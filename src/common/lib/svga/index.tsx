/*
 * @Author: your name
 * @Date: 2022-05-21 10:16:08
 * @LastEditTime: 2022-05-22 10:36:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /bingo-game-react/src/common/lib/svga/index.tsx
 */
import React, { useEffect, useRef } from 'react';
import { Player, Downloader, Parser } from 'svga.lite';
// @ts-ignore
import { addPlayer, autoPause } from './utils.js';
const downloader = new Downloader();
// @ts-ignore
const parser = new Parser({ disableWorker: true });

export type ComponentProps = {
  url: string;
  isPause?: boolean;
  options: object;
  onStart?: Function;
  onProcess?: Function;
  onPause?: Function;
  onEnd?: Function;
  className?: string;
};

function Component(props: ComponentProps) {
  let player: any = null;
  const canvasRef = useRef(null);
  // let player: any = null;

  async function parseSvga(dom: any) {
    try {
      if (!player) {
        const fileData = await downloader.get(props.url);
        const svgaData = await parser.do(fileData);
        player = new Player(dom) as any;
        autoPause && addPlayer(player);
        eventListen(player);
        (player as any).set(props.options);
        await (player as any).mount(svgaData);
      }
      (player as any).start();
      // setPlayer(player);
      // if ((autoPause && isWebViewPause) || props.isPause) return;
      // (player as any).start()(player as any).tmpStatus = true;
    } catch (error) {
      console.log(error);
    }
  }

  function eventListen(player: any) {
    player.$on('start', () => {
      props.onStart && props.onStart();
    });
    player.$on('process', () => {
      props.onProcess && props.onProcess((player as any).progres);
    });
    player.$on('pause', () => {
      props.onPause && props.onPause();
    });
    player.$on('end', () => {
      (player as any).tmpStatus = false;
      props.onEnd && props.onEnd();
    });
  }

  // 在 canvas 挂载的时候执行
  useEffect(() => {
    parseSvga(canvasRef.current as any);
    return () => {
      (player as any)?.clear();
      (player as any)?.destroy();
    };
  });

  return <canvas className={props.className} ref={canvasRef}></canvas>;
}

export default Component;
