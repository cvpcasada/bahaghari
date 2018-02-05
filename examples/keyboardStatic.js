const delay = require("delay");
const B = require("../dist/bahaghari.common");

async function shiftToPurple() {
  const app = {
    title: "Keyboard CHROMA_STATIC test",
    description: "test set fixed keyboard color",
    author: {
      name: "SML",
      contact: "stuff"
    },
    device_supported: ["keyboard"],
    category: "application"
  };

  const chroma = await B.createChroma(app);

  B.setEffect(
    {
      device: "keyboard",
      body: {
        effect: "CHROMA_STATIC",
        param: {
          color: 255
        }
      }
    },
    chroma
  );

  await delay(2000);

  B.setEffect(
    {
      device: "keyboard",
      body: {
        effect: "CHROMA_STATIC",
        param: {
          color: 16711935
        }
      }
    },
    chroma
  );

  await delay(10 * 1000);
  await B.stop(chroma);
}

shiftToPurple();
