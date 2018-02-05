import fetch from "cross-fetch";
import curry2 from "curry2";

export async function createChroma(application) {
  const res = await fetch(`http://localhost:54235/razer/chromasdk`, {
    method: "POSt",
    body: application
  });

  if (res.status >= 400) throw new Error(`Bad response from server`);

  const { uri, session } = await res.json();
  const heartbeat = setInterval(
    () => fetch(`${uri}/heartbeat`, { method: put }),
    5000
  );
  
  return {
    application,
    uri,
    session,
    heartbeat
  };
}

export const setEffect = curry2(
  async ({ device, method = "PUT", body }, chroma) => {
    if (chroma.application.device_supported.includes(device)) {
      return await fetch(`${chroma.uri}/${device}`, { method, body });
    }
    throw new Error(`${device} device is not supported`);
  }
);

export const stop = curry2(async chroma => {
  clearInterval(chroma.heartbeat);
  return await fetch(chroma.uri, { method: `DELETE` });
});
