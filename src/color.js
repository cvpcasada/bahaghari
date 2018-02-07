
const trunc = num => Math.max(0, Math.min(255, num));

export function createBGRColor(color = { r: 0, g: 0, b: 0 }) {
  if (typeof color === "string") {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    color = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  } else if (typeof color === "number") {
    color = {
      b: (color >> 16) & 0xff,
      g: (color >> 8) & 0xff,
      r: (color >> 0) & 0xff
    };
  }

  // normalize
  color.r = trunc(color.r);
  color.g = trunc(color.g);
  color.b = trunc(color.b);

  // convert to bgr
  let rhex = color.r.toString(16);
  if (rhex.length < 2) {
    rhex = "0" + rhex;
  }
  let ghex = color.g.toString(16);
  if (ghex.length < 2) {
    ghex = "0" + ghex;
  }
  let bhex = color.b.toString(16);
  if (bhex.length < 2) {
    bhex = "0" + bhex;
  }

  let result = bhex + ghex + rhex;

  return parseInt(result, 16);
}

export const Black = createBGRColor("000000");
export const HotPink = createBGRColor({ r: 255, g: 105, b: 180 });
export const Orange = createBGRColor("ffa500");
export const Pink = createBGRColor("ff00ff");
export const Purple = createBGRColor("800080");
export const White = createBGRColor({ r: 255, g: 255, b: 255 });
export const Yellow = createBGRColor({ r: 255, g: 255, b: 0 });
