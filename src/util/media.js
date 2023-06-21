import { MEDIA_URL } from '../consts';

export function srcUrl(src) {
  return `${MEDIA_URL}/get/${src}`;
}

export async function upload(file) {
  const formData = new FormData();
  formData.append(file.name || 'file', file);
  const res = await fetch(`${MEDIA_URL}/upload`, {
    method: 'POST',
    body: formData
  });
  const json = await res.json();
  console.log(file, json);
  return json.src ? srcUrl(json.src) : null;
}
