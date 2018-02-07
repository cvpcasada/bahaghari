import { clearInterval } from 'timers';

const Bahaghari = require(`../src/index`);

describe(`Razer interface`, () => {
  it(`connects successfully`, async () => {
    const chromaInstance = await Bahaghari.createChroma({
      title: 'Razer Chroma SDK RESTful Test Application',
      description: 'This is a REST interface test application',
      author: {
        name: 'Chroma Developer',
        contact: 'www.razerzone.com',
      },
      device_supported: [
        'keyboard',
        'mouse',
        'headset',
        'mousepad',
        'keypad',
        'chromalink',
      ],
      category: 'application',
    });

    // close the heartbeat
    clearInterval(chromaInstance.heartbeat);

    expect(chromaInstance.application).toMatchSnapshot();
    expect(chromaInstance.sessionid).toBeDefined();
    expect(chromaInstance.uri).toBeDefined();
  });
});
