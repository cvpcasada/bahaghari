import bezier from "bezier";
import hexToRgb from "hex-to-rgb";

export function generateGradient(colors = []) {
  let colorArray = colors.map(hexToRgb);

  return t =>
    colorArray[0].map((col, i) =>
      Math.trunc(bezier(colorArray.map(row => row[i]), t))
    );
}

export function createBGRColor(color = [0, 0, 0]) {
  if (typeof color === 'string') {
    const result = hexToRgb(color);
    color = {
      r: result[0],
      g: result[1],
      b: result[2]
    };
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
    };
  }

  // convert to bgr
  return (color.b << 16) | (color.g << 8) | color.r;
}
