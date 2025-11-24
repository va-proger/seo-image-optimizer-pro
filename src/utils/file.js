import { generateAltFromFilename } from "./alt";

export function humanFileSize(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(1)} ${units[i]}`;
}

export function createFileModel(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve({
        id: crypto.randomUUID(),
        file,
        name: file.name,
        type: file.type,
        size: file.size,
        sizeHuman: humanFileSize(file.size),
        previewUrl: e.target.result, // base64 картинка
        optimized: null,             // пока пусто
        alt: generateAltFromFilename(file.name),
      });
    };

    reader.readAsDataURL(file);
  });
}
