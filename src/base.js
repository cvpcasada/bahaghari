import fetch from 'cross-fetch';
import curry2 from 'curry2';
import delay from 'delay';

export async function createChroma(application) {
  const res = await fetch(`http://localhost:54235/razer/chromasdk`, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(application),
  });

  if (res.status >= 400) throw new Error(`Bad response from server`);
  const { uri, sessionid } = await res.json();
  const heartbeat = setInterval(
    () => fetch(`${uri}/heartbeat`, { method: 'PUT' }),
    5000,
  );

  return {
    application,
    uri,
    sessionid,
    heartbeat,
  };
}

export const setEffect = curry2(
  async ({ device, method = 'PUT', body }, chroma) => {
    if (chroma.application.device_supported.includes(device)) {
      return await fetch(`${chroma.uri}/${device}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    }
    throw new Error(`${device} device is not supported`);
  },
);

export const deleteEffect = curry2(async (effectIds = [], chroma) => {
  if (effectIds.length === 0) return;
  return await fetch(`${chroma.uri}/effect`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: `DELETE`,
    body: JSON.stringify(effectIds),
  });
});

export async function stop(chroma) {
  await delay(1000);
  clearInterval(chroma.heartbeat);
  return await fetch(chroma.uri, { method: `DELETE` });
}
