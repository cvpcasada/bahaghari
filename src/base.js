import fetch from 'cross-fetch';
import { delay } from './helpers';

const defaultOpts = {
  heartbeat: true,
  url: 'https://chromasdk.io:54236/razer/chromasdk'
};

export async function createChroma(
  application,
  { heartbeat, url } = defaultOpts
) {
  if (!url) throw new Error(`Please provide razer rest sdk url`);

  const res = await fetch(url, {
    method: `POST`,
    mode: `cors`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(application)
  });

  if (res.status >= 400) throw new Error(`Bad response from server`);
  const { uri, sessionid } = await res.json();

  return {
    application,
    uri,
    sessionid,
    heartbeat:
      (typeof heartbeat === 'undefined' || heartbeat) &&
      setInterval(() => fetch(`${uri}/heartbeat`, { method: 'PUT' }), 5000)
  };
}

export async function setEffect(chroma, { device, method = 'PUT', body }) {
  if (chroma.application.device_supported.includes(device)) {
    const res = await fetch(`${chroma.uri}/${device}`, {
      method,
      mode: `cors`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const jsonResp = await res.json();

    if (!jsonResp || !('results' in jsonResp || 'result' in jsonResp)) {
      throw new Error(`Empty Response`);
    }

    return jsonResp;
  }
  throw new Error(`${device} device is not supported`);
}

export async function setEffects(chroma, { effectIds, fps }) {
  if (effectIds.length === 0) {
    return;
  }

  let jsonresp = [];
  for (let i = 0; i < effectIds.length; i++) {
    const deviceResp = await fetch(`${chroma.uri}/effect`, {
      method: `PUT`,
      mode: `cors`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: effectIds[i] })
    });
    await delay(1000 / fps);
    jsonresp.push(await deviceResp.json());
  }

  return jsonresp;
}

export async function deleteEffect(chroma, effectIds = []) {
  if (effectIds.length === 0) return;
  return await fetch(`${chroma.uri}/effect`, {
    mode: `cors`,
    headers: {
      'Content-Type': 'application/json'
    },
    method: `DELETE`,
    body: JSON.stringify(effectIds)
  });
}

export async function stop(chroma) {
  chroma.heartbeat && clearInterval(chroma.heartbeat);

  await delay(300);
  const res = await fetch(`${chroma.uri}/chromasdk`, {
    mode: `cors`,
    headers: {
      'Content-Type': 'application/json'
    },
    method: `DELETE`
  });
  return await res.json();
}
