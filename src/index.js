import { createChroma, setEffect, deleteEffect, stop } from "./base";
import { setOffEffect, setStaticEffect } from "./effects";
import { setBreathingAnimation, setWaveAnimation } from "./animations";
import * as ColorUtils from "./color";

const { createBGRColor, ...Colors } = ColorUtils;

export {
  createBGRColor,
  Colors,
  createChroma,
  setEffect,
  deleteEffect,
  stop,
  setBreathingAnimation,
  setWaveAnimation,
  setOffEffect,
  setStaticEffect
};