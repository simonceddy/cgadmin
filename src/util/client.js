/* eslint-disable no-unused-vars */
import { API_URL, MEDIA_URL, SERVER_URL } from '../consts';

const headers = new Headers({
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  Accept: 'application/json',
});

async function getCsrfCookie() {
  const tokenRes = await fetch(`${SERVER_URL}/sanctum/csrf-cookie`);
  console.log(tokenRes);
  // const testRes = await fetch(`${MEDIA_URL}/upload`, {
  //   method: 'POST',
  //   headers
  // });
  // // const body = await testRes.text();
  // console.log(testRes);
}

// getCsrfCookie();

/**
 *
 * @param {string} url
 * @param {*} opts
 */
export default async function client(url = API_URL, opts = {}) {
  await getCsrfCookie();
  const res = await fetch(url, {
    method: 'GET',
    headers,
    mode: 'cors',
    ...opts
  });

  return res;
}
