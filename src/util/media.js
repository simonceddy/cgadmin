import { MEDIA_URL } from '../consts';

export function srcUrl(src) {
  return `${MEDIA_URL}/get/${src}`;
}

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
    body: formData
  });
  const json = await res.json();
  // console.log(file, json);
  return json.src ? srcUrl(json.src) : null;
}
