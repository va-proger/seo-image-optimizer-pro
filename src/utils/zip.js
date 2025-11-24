import JSZip from "jszip";
import { saveAs } from "file-saver";

export function generatePictureTag(file) {
  const base = file.name.replace(/\.[^.]+$/, "");

  const grouped = {};
  for (const v of file.optimized) {
    const ext = v.format.replace("image/", "");
    if (!grouped[ext]) grouped[ext] = [];
    grouped[ext].push(v);
  }

  let picture = `<picture>\n`;

  for (const ext in grouped) {
    const versions = grouped[ext];

    const srcset = versions
      .map(v => `optimized/${base}-${v.width}.${ext} ${v.width}w`)
      .join(", ");

    picture += `  <source type="image/${ext}" srcset="${srcset}" sizes="100vw">\n`;
  }

  const largest = file.optimized.at(-1);
  const fallbackExt = largest.format.replace("image/", "");

  picture += `  <img 
    src="optimized/${base}-${largest.width}.${fallbackExt}" 
    width="${largest.width}" 
    height="${largest.height}" 
    alt="${file.alt}"
    loading="lazy"
  >\n`;

  picture += `</picture>`;

  return picture;
}


export async function generateZip(files) {
  const zip = new JSZip();

  const optFolder = zip.folder("optimized");
  const origFolder = zip.folder("original");

  const metadata = [];
  let htmlSnippets = "";

  for (const file of files) {
    if (!file.optimized) continue;

    const base = file.name.replace(/\.[^.]+$/, "");

    // ---- СОХРАНЕНИЕ КАЖДОГО ВЕРСИОННОГО ФАЙЛА ----
    for (const version of file.optimized) {
      const ext = version.format.replace("image/", ""); // webp / avif / jpeg

      optFolder.file(
        `${base}-${version.width}.${ext}`,
        version.blob,
        { binary: true }
      );
    }

    // ---- ОРИГИНАЛ ----
    origFolder.file(file.name, file.file, { binary: true });

    // ---- METADATA ----
    metadata.push({
      originalName: file.name,
      alt: file.alt,
      versions: file.optimized.map(v => ({
        width: v.width,
        height: v.height,
        size: v.size,
        format: v.format,
        file: `${base}-${v.width}.${v.format.replace("image/", "")}`
      }))
    });

    // ---- HTML <picture> snippet ----
    htmlSnippets += generatePictureTag(file) + "\n\n";
  }

  // ---- ФАЙЛЫ МЕТАДАННЫХ ----
  zip.file("metadata.json", JSON.stringify(metadata, null, 2));
  zip.file("html-snippets.html", htmlSnippets);

  // ---- СБОРКА ZIP ----
  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, "optimized-images.zip");
}
