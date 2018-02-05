export function createBGRColorFromHex() {
  if (g === null && b === null && r !== null) {
    if (typeof r === "string") {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);
      r = parseInt(result[1], 16);
      g = parseInt(result[2], 16);
      b = parseInt(result[3], 16);
    } else {
      b = (r >> 16) & 0xff;
      g = (r >> 8) & 0xff;
      r = (r >> 0) & 0xff;
    }
  } else {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
  }

  return createBGRColor(r, g, b);
}

export function createBGRColor(r, g, b) {
  if (r > 255) {
    r = 255;
  }
  if (g > 255) {
    g = 255;
  }
  if (b > 255) {
    b = 255;
  }
  if (r < 0) {
    r = 0;
  }
  if (g < 0) {
    g = 0;
  }
  if (b < 0) {
    b = 0;
  }

  let rhex = r.toString(16);
  if (rhex.length < 2) {
    rhex = "0" + rhex;
  }
  let ghex = g.toString(16);
  if (ghex.length < 2) {
    ghex = "0" + ghex;
  }
  let bhex = b.toString(16);
  if (bhex.length < 2) {
    bhex = "0" + bhex;
  }

  let result = bhex + ghex + rhex;

  return parseInt(result, 16);
}

export const Black = createBGRColorFromHex("000000");
export const HotPink = createBGRColor(255, 105, 180);
export const Orange = createBGRColorFromHex("ffa500");
export const Pink = createBGRColorFromHex("ff00ff");
export const Purple = createBGRColorFromHex("800080");
export const White = createBGRColor(255, 255, 255);
export const Yellow = createBGRColor(255, 255, 0);
