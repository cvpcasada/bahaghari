import { Effects } from './effects';
import { setEffect, setEffects, deleteEffect } from './base';
import C from 'chroma-js';
import { createBGRColor } from './color';
import delay from 'delay';

const FPS = 24;
// 15fps
const delayMS = 1000 / FPS;


const waveFn = (fps, x) => Math.pow(Math.sin(Math.PI * x / fps), 2);

const WAVELENGTH_MULTIPLIER = 4;
export async function setBreathingAnimation(
  { device, duration, colors = [] },
  chroma,
) {
  const gradientFn = C.scale(colors);

  const effects = [];

  // half of sine wave
  for (let i = 0; i < (FPS * WAVELENGTH_MULTIPLIER) / 2; i++) {
    effects.push({
      effect: Effects.CHROMA_STATIC,
      param: {
        color: createBGRColor(gradientFn(waveFn(FPS * WAVELENGTH_MULTIPLIER, i)).hex())
      }
    })
  }

  const results = await setEffect({body: {effects}, device, method: 'POST'}, chroma);
  
  // add the other half (reverse) to comlpete cycle
  results.results = results.results.concat(results.results.slice(0).reverse());

  // cycle while reversing the effects
  for (let i = 0; i < duration / (1000 * WAVELENGTH_MULTIPLIER); i++ ) {
    await setEffects({effectIds: results.results.map(x => x.id), fps: FPS}, chroma);
  }

  return await deleteEffect(results.results.map(x => x.id), chroma);
}

export async function setWaveAnimation({ device, cycles, colors }, chroma) {
  const gradientFn = C.scale(colors);

  // generate colors for each key column
  let colColors = [];
  for (let i = 0; i < 22; i++) {
    colColors.push(createBGRColor(gradientFn(i/22).hex()));
  }

  const effects = [];
  for (let i = 0; i < 22; i++) {
    effects.push({effect: Effects.CHROMA_CUSTOM, param: Array(6).fill(colColors.slice(0))});

    // shift colors
    colColors.unshift(colColors.pop());
  }
  
  const results = await setEffect({device, body: {effects}, method: 'POST'}, chroma);

  // do the cycle?
  for (let i = 0; i < cycles; i++) {
    await setEffects({device, effectIds: results.results.map(x => x.id), fps: FPS}, chroma);
  }

  return await deleteEffect(results.results.map(x => x.id), chroma);
}
