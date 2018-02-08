import bezier from "bezier";
import hexToRgb from 'hex-to-rgb';

const trunc = num => Math.max(0, Math.min(255, num));

export function generateGradient(colors = []) {
  let colorArray = colors.map(hexToRgb);

  return t =>
    colorArray[0].map((col, i) => Math.trunc(bezier(colorArray.map(row => row[i]), t)));
}

export function createBGRColor(color = [0 ,0, 0]) {
  if (typeof color === "string") {
    const result = hexToRgb(color);
    color = {
      r: color[0],
      g: color[1],
      b: color[2]
    }
  } else if (typeof color === "number") {
    color = {
      b: (color >> 16) & 0xff,
      g: (color >> 8) & 0xff,
      r: (color >> 0) & 0xff
    };
  } else if (Array.isArray(color)) {
    color = {
      r: color[0],
      g: color[1],
      b: color[2]
    }
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