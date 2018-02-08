const B = require('../dist/bahaghari.common');

async function start() {
  const app = {
    title: 'Keyboard CHROMA_STATIC test',
    description: 'test set fixed keyboard color',
    author: {
      name: 'SML',
      contact: 'stuff',
    },
    device_supported: ['keyboard'],
    category: 'application',
  };

  const chroma = await B.createChroma(app);

  await B.setWaveAnimation(
    {
      device: app.device_supported[0],
      cycles: 10,
      colors: [`#ff0000`, `#00FF00`],
    },
    chroma,
  );

  await B.setBreathingAnimation(
    {
      device: app.device_supported[0],
      duration: 10000,
      colors: [`#551a8b`, `#000`, `#00ff00` ],
    },
    chroma,
  );

  await B.stop(chroma);
}

start();
