import { setStaticEffect, setOffEffect } from './effects';
import C from 'chroma-js';
import { createBGRColor } from './color';
import delay from 'delay';

const FPS = 60;
// 15fps
const delayMS = 1000 / FPS;

export async function setBreathingAnimation(
  { device, duration, colors = [] },
  chroma,
) {
  const gradientFn = C.scale(colors);
  const cancelToken = setInterval(async () => {
    for (let i = 0; i < FPS; i++) {
      await setStaticEffect(
        { device, color: createBGRColor(gradientFn(i)) },
        chroma,
      );
      await delay(delayMS);
    }
  }, delayMS);

  await delay(duration);

  clearInterval(cancelToken);

  return await setOffEffect({ device }, chroma);
}

export async function setWaveAnimation({ device, duration, colors }, chroma) {
  throw new Error(`Not implemented yet`);
}
