export const token = document.head.querySelector('meta[name="csrf-token"]')?.content;

console.log(token);
