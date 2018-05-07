import { setEffect } from './base';

export const Effects = {
  CHROMA_NONE: `CHROMA_NONE`,
  CHROMA_CUSTOM: `CHROMA_CUSTOM`,
  CHROMA_CUSTOM2: `CHROMA_CUSTOM2`,
  CHROMA_STATIC: `CHROMA_STATIC`,
};

export async function setStaticEffect(chroma, { device, color }) {
  return await setEffect(chroma, {
    device,
    body: {
      effect: Effects.CHROMA_STATIC,
      param: { color },
    },
  });
}

export async function setCustomEffect(chroma, { device, param }) {
  return await setEffect(chroma, {
    device,
    body: {
      effect: Effects.CHROMA_CUSTOM,
      param,
    },
  });
}

export async function setOffEffect(chroma, { device }) {
  return await setEffect(chroma, {
    device,
    body: {
      effect: Effects.CHROMA_NONE,
    },
  });
}
