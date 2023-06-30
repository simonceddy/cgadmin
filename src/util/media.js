import { MEDIA_URL } from '../consts';
import { token } from './getCSRF';

export function srcUrl(src) {
  return `${MEDIA_URL}/get/${src}`;
}

const headers = new Headers({
  'X-XSRF-TOKEN': token
});

/**
 * Upload a file
 * @param {File} file file to upload
 * @returns {string|null}
 */
export async function upload(file) {
  const b = await file.arrayBuffer();
  console.log(b);
  const formData = new FormData();
  formData.append(file.name || 'file', file);
  const res = await fetch(`${MEDIA_URL}/upload`, {
    method: 'POST',
    body: formData,
    headers,
  });
  const json = await res.json();
  console.log(res);
  return json.src ? srcUrl(json.src) : null;
}
