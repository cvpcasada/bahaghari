# Bahaghari
Functional javascript API wrapper for Razer Chroma REST api.

*Work in progress*

## Usage

```javascript
import * as B from 'bahaghari';

const app = {
    title: 'App Title',
    description: 'App Desc',
    author: {
        name: 'Cyrus',
        contact: `my.email@email.com`
    },
    device_supported: ['keyboard', 'mousepad', ...]
}

const chromaIntance = B.createChroma(app);

// apply effects
await B.setWaveAnimation({
    device: `keyboard`,
    cycles: 5,
    colors: ['#fff', `red`, ...]
}, chromaInstance);

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
