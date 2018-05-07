const B = require("../dist/bahaghari.common");

const delay = (ms) => new Promise((res, rej) => {
  setTimeout(res, ms);
});

async function start() {
  const app = {
    title: "Keyboard CHROMA_STATIC test",
    description: "test set fixed keyboard color",
    author: {
      name: "Chroma Developer",
      contact: "www.razerzone.com"
    },
    device_supported: ["keyboard"],
    category: "application"
  };

  try {
    const chroma = await B.createChroma(app, {
      heartbeat: true,
      url: "http://localhost:54235/razer/chromasdk"
    });
  
    await B.setWaveAnimation(chroma, {
      device: app.device_supported[0],
      cycles: 3,
      colors: [`#ff0000`, `#00FF00`]
    });
  
    await B.setStaticEffect(chroma, { device: app.device_supported[0], color: 255 });
  
    await delay(3000);

    await B.setBreathingAnimation(chroma, {
      device: app.device_supported[0],
      duration: 3000,
      colors: [`#551a8b`, `#000`, `#00ff00`]
    });

    await delay(3000);
  
    await B.stop(chroma);

    console.log(`done!`)

  } catch (e) {
    console.error(e);
  }
}

start();
