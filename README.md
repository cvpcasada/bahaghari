# Bahaghari
Functional javascript API wrapper for Razer Chroma REST api.

Full Rest Documentation can be found here: https://assets.razerzone.com/dev_portal/REST/html/index.html

*Documentation is work in progress*

## Usage

```javascript
import * as B from 'bahaghari';

const options = {
  heartbeat: true,
  url: 'https://chromasdk.io:54236/razer/chromasdk'
};

const app = {
    title: 'App Title',
    description: 'App Desc',
    author: {
        name: 'Cyrus',
        contact: `my.email@email.com`
    },
    device_supported: ['keyboard', 'mousepad', ...]
}

const chromaIntance = B.createChroma(app, options);

// apply effects
await B.setWaveAnimation(chromaInstance, {
    device: `keyboard`,
    cycles: 5,
    colors: ['#fff', `red`, ...]
});

// cleanup / close
await B.stop(chromaInstance);
```

## Functions
*Work in progress*

- `createBGRColor` :: hex_string || {r: num, b: num, g: num} -> bgr: num
- `createChroma` :: app -> Promise<chromaInstance>
- `setEffect` :: OPTS {device, method, body} , chroma -> Promise<>
- `deleteEffect`
- `stop`
- `setCustomEffect`
- `setBreathingAnimation`
- `setWaveAnimation`
- `setOffEffect`
- `setStaticEffect`
