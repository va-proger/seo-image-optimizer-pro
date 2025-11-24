// src/utils/optimize.js

// Быстрая загрузка через createImageBitmap
export async function loadBitmap(file) {
  return await createImageBitmap(file);
}

// Resize bitmap через Canvas
export function resizeBitmap(bitmap, maxWidth, maxHeight) {
  const ratio = Math.min(maxWidth / bitmap.width, maxHeight / bitmap.height, 1);

  const w = Math.round(bitmap.width * ratio);
  const h = Math.round(bitmap.height * ratio);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, w, h);

  return { canvas, width: w, height: h };
}

// Конвертация Canvas → Blob (WebP)
export function canvasToBlob(canvas, type = "image/webp", quality = 0.8) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

// Основная функция оптимизации
export async function optimizeImage(fileModel, settings) {
  const bitmap = await loadBitmap(fileModel.file);

  const { canvas, width, height } = resizeBitmap(
    bitmap,
    settings.maxWidth,
    settings.maxHeight
  );

  const blob = await canvasToBlob(canvas, settings.format, settings.quality);

  return {
    blob,
    width,
    height,
    format: settings.format,
    size: blob.size,
  };
}
