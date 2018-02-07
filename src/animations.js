import { setStaticEffect, setOffEffect } from "./effects";

import delay from "delay";

// 15fps
const delayMS = 1000 / 60;

export async function setBreathingAnimation(
  { device, duration, colors = [] },
  chroma
) {
  const cancelToken = setInterval(async () => {
    for (let i = 0; i < colors.length; i++) {
      await setStaticEffect({ device, color: colors[i] }, chroma);
      await delay(delayMS);
    }
  }, delayMS);

  await delay(duration);

  clearInterval(cancelToken);

  return await setOffEffect({ device }, chroma);
}

export async function setWaveAnimation() {
    throw new Error(`Not implemented yet`);
}