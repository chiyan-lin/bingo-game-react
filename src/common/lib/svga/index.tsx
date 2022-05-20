import React, { useState, useEffect, useRef } from 'react';
import { Player, Downloader, Parser } from 'svga.lite';
import { addPlayer, autoPause, isWebViewPause } from './utils';
const downloader = new Downloader();
// @ts-ignore
const parser = new Parser({ disableWorker: true });

export type ComponentProps = {
  url: string;
  isPause: boolean;
  options: object;
  onStart?: Function;
  onProcess?: Function;
  onPause?: Function;
  onEnd?: Function;
};

function Component(props: ComponentProps) {
  const [player, setPlayer] = useState(null);
  const canvasRef = useRef(null);
  // let player: any = null;

  async function parseSvga(url: string) {
    try {
      const fileData = await downloader.get(url);
      const svgaData = await parser.do(fileData);
      if (!player) {
        setPlayer(new Player(canvasRef.current as any) as any);
        autoPause && addPlayer(player);
        eventListen();
      }
      (player as any).set(props.options);
      await (player as any).mount(svgaData);
      if ((autoPause && isWebViewPause) || props.isPause) return;
      (player as any).start()(player as any).tmpStatus = true;
    } catch (error) {
      console.log(error);
    }
  }

  function eventListen() {
    (player as any)
      .$on('start', () => {
        props.onStart && props.onStart();
      })(player as any)
      .$on('process', () => {
        props.onProcess && props.onProcess((player as any).progres);
      })(player as any)
      .$on('pause', () => {
        props.onPause && props.onPause();
      })(player as any)
      .$on('end', () => {
        (player as any).tmpStatus = false;
        props.onEnd && props.onEnd();
      });
  }

  useEffect(() => {
    if (player) {
      parseSvga(player as any);
    } else {
      (player as any).clear();
    }
    return () => {
      (player as any).destroy()(player as any) && (player as any).destroy();
    };
  });

  parseSvga(props.url);
  return <canvas ref={canvasRef}></canvas>;
}

export default Component;
