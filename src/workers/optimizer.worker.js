async function stripMeta(blob, format, quality) {
  const bitmap = await createImageBitmap(blob);

  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0);

  return await canvas.convertToBlob({
    type: format,
    quality
  });
}

// --- FIX: устойчивое преобразование AVIF ---
async function safeConvert(canvas, format, quality) {
  let blob = null;

  // 1. Пробуем с quality
  try {
    blob = await canvas.convertToBlob({ type: format, quality });
    if (blob) return blob;
  } catch (err) {
    if (import.meta.env.DEV) console.warn("convertToBlob failed:", err);
  }

  try {
    blob = await canvas.convertToBlob({ type: format });
    if (blob) return blob;
  } catch (err) {
    if (import.meta.env.DEV) console.warn("convertToBlob failed:", err);
  }

  try {
    blob = await canvas.convertToBlob({ type: "image/webp", quality });
    if (blob) return blob;
  } catch (err) {
    if (import.meta.env.DEV) console.warn("convertToBlob failed:", err);
  }

  // 4. Fallback → JPEG
  return canvas.convertToBlob({ type: "image/jpeg", quality: 0.9 });
}

self.onmessage = async (e) => {
  const { id, file, settings } = e.data;
  const { quality, format, stripMetadata, sizes } = settings;

  const originalBitmap = await createImageBitmap(file);
  const results = [];

  for (const targetWidth of sizes.map(Number)) {
    const ratio = targetWidth / originalBitmap.width;
    const targetHeight = Math.round(originalBitmap.height * ratio);

    const canvas = new OffscreenCanvas(targetWidth, targetHeight);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(originalBitmap, 0, 0, targetWidth, targetHeight);

    // --- FIX HERE ---
    let blob = await safeConvert(canvas, format, quality);

    if (stripMetadata) {
      blob = await stripMeta(blob, format, quality);
    }

    results.push({
      width: targetWidth,
      height: targetHeight,
      blob,
      size: blob.size,
      format,
    });
  }

  self.postMessage({
    id,
    status: "done",
    payload: results,
  });
};
