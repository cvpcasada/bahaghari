import { Effects } from './effects';

export const Devices = [
  `keyboard`,
  `mouse`,
  `mousepad`,
  `headset`,
  `keypad`,
  `chromalink`,
];

export const DeviceCustomEffectConfig = {
  chromalink: [Effects.CHROMA_CUSTOM, { row: 1, col: 5 }],
  keypad: [Effects.CHROMA_CUSTOM, { row: 4, col: 5 }],
  headset: [Effects.CHROMA_CUSTOM, { row: 1, col: 5 }],
  mousepad: [Effects.CHROMA_CUSTOM, { row: 1, col: 15 }],
  mouse: [Effects.CHROMA_CUSTOM2, { row: 9, col: 7 }],
  keyboard: [Effects.CHROMA_CUSTOM, { row: 6, col: 22 }],
};