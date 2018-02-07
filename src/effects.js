import { setEffect } from './base';

export const Effects = {
  CHROMA_NONE: `CHROMA_NONE`,
  CHROMA_CUSTOM: `CHROMA_CUSTOM`,
  CHROMA_STATIC: `CHROMA_STATIC`,
};

export async function setStaticEffect({ device, color }, chroma) {
  return await setEffect(
    {
      device,
      body: {
        effect: Effects.CHROMA_STATIC,
        param: { color },
      },
    },
    chroma,
  );
}

export async function setCustomEffect({ device, param }, chroma) {
  return await setEffect(
    {
      device,
      body: {
        effect: Effects.CHROMA_CUSTOM,
        param,
      },
    },
    chroma,
  );
}

export async function setOffEffect({ device }, chroma) {
  return await setEffect(
    {
      device,
      body: {
        effect: Effects.CHROMA_NONE,
      },
    },
    chroma,
  );
}
