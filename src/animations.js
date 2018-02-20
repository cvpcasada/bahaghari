import { Effects, setOffEffect } from './effects';
import { setEffect } from './base';
import { createBGRColor, generateGradient } from './color';
import { DeviceCustomEffectConfig } from './devices';
import { delay } from './utils';

const FPS = 24;
const WAVELENGTH_MULTIPLIER = 4;

const waveFn = (fps, x) => Math.pow(Math.sin(Math.PI * x / fps), 2);

export async function setBreathingAnimation(
  { device, duration, colors = [] },
  chroma,
) {
  const gradientFn = generateGradient(colors);

  let effects = [];

  // half of sine wave
  for (let i = 0; i < FPS * WAVELENGTH_MULTIPLIER / 2; i++) {
    effects.push({
      effect: Effects.CHROMA_STATIC,
      param: {
        color: createBGRColor(
          gradientFn(waveFn(FPS * WAVELENGTH_MULTIPLIER, i)),
        ),
      },
    });
  }

  // add the other half (reverse) to comlpete cycle
  effects = effects.concat(effects.slice(0).reverse());

  // cycle while reversing the effects
  for (let i = 0; i < duration / (1000 * WAVELENGTH_MULTIPLIER); i++) {
    await Promise.all(
      effects.map(async effect => await setEffect({ body: effect }, chroma)),
    );
  }
}

export async function setWaveAnimation({ device, cycles, colors }, chroma) {
  const gradientFn = generateGradient(colors);
  const [customEffect, options] = DeviceCustomEffectConfig[device];

  const colColors = [];
  for (let i = 0; i < options.col; i++) {
    colColors.push(createBGRColor(gradientFn(i / options.col)));
  }

  const effects = [];
  for (let i = 0; i < options.col; i++) {
    effects.push({
      effect: customEffect,
      param:
        options.row === 1
          ? colColors.slice(0)
          : Array(options.row).fill(colColors.slice(0)),
    });

    // shift colors
    colColors.unshift(colColors.pop());
  }

  // do the cycle?
  for (let i = 0; i < cycles; i++) {
    for (let j = 0; j < options.col; j++) {
      await setEffect({ device, body: effects[j] }, chroma);
      await delay(1000 / FPS);
    }
  }
}
