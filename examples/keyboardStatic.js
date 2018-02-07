const delay = require('delay');
const B = require('../dist/bahaghari.common');

async function shiftToPurple() {
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

  await B.setBreathingAnimation(
    {
      device: app.device_supported[0],
      duration: 10000,
      colors: ['#fff', '#9400D3', '#000'],
    },
    chroma,
  );
  await B.stop(chroma);
}

shiftToPurple();
