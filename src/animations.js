import { setStaticEffect, setOffEffect } from "./effects";

import delay from "delay";
import { clearInterval } from "timers";

// 15fps
const delayMS = 1000 / 15;

export async function setBreathingAnimation(
  { device, duration, colors = [] },
  chroma
) {
  const cancelToken = setInterval(async () => {
    for (let color of colors) {
      await setStaticEffect({ device, color }, chroma);
      await delay(delayMS);
    }
  }, delayMS);

  await delay(2000);

  clearInterval(cancelToken);

  await setOffEffect({ device }, chroma);
}

export async function setWaveAnimation() {
    throw new Error(`Not implemented yet`);
}