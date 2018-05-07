const B = require('../dist/bahaghari.common');

async function start() {
  const app = {
    title: 'Bahaghari Examples Test',
    description: 'test set fixed keyboard color',
    author: {
      name: 'Chroma Developer',
      contact: 'www.razerzone.com',
    },
    device_supported: ['keyboard'],
    category: 'application',
  };

  const chroma = await B.createChroma(app);

  await B.setWaveAnimation(chroma, {
    device: app.device_supported[0],
    cycles: 10,
    colors: [`#ff0000`, `#00FF00`],
  });

  await B.setStaticEffect(chroma, { device: `keyboard`, color: 255 });

  await B.setBreathingAnimation(chroma, {
    device: app.device_supported[0],
    duration: 10000,
    colors: [`#551a8b`, `#000`, `#00ff00`],
  });

  await B.stop(chroma);
}

start();
