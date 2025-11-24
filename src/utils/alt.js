const keywordMap = {
  house: "дом",
  modern: "современный",
  table: "стол",
  desk: "рабочий стол",
  chair: "стул",
  laptop: "ноутбук",
  monitor: "монитор",
  keyboard: "клавиатура",
  cat: "кот",
  dog: "собака",
  flower: "цветок",
  beauty: "косметика",
  product: "товар",
  phone: "смартфон",
  portrait: "портрет",
};

function isGarbageName(name) {
  const hexRatio = (name.match(/[0-9a-f]/gi) || []).length / name.length;
  const uuidLike = /^[0-9a-f]{8}[-_\.][0-9a-f]{4}[-_\.][0-9a-f]{4}[-_\.][0-9a-f]{4}[-_\.][0-9a-f]{12}$/i.test(name);
  const dashParts = name.split(/[-_\.]/);

  if (uuidLike) return true;
  if (hexRatio > 0.4) return true;
  if (dashParts.length >= 4) return true;

  return false;
}

function defaultAlt() {
  return "Изображение";
}

function removeGarbage(name) {
  return name
    .replace(/\b(IMG|DSC|PHOTO|PIC|SCREENSHOT|SCAN|image)\b/gi, "")
    .replace(/[0-9a-f]{8,}/gi, "")
    .replace(/\b\d{5,}\b/g, "")
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function translateKeywords(name) {
  return name
    .split(" ")
    .map((w) => keywordMap[w.toLowerCase()] || w)
    .join(" ");
}

function smartSemanticTransforms(name) {
  return name
    .replace(/\bv(\d+)\b/gi, "версия $1")
    .replace(/\b(\d{4})\b/g, "($1)")
    .trim();
}

function enrichMeaning(name) {
  const words = name.split(" ");
  if (words.length <= 2) return name + " — фото";
  return name;
}

function toTitleCase(text) {
  return text.replace(/\b\w/g, (c) => c.toUpperCase());
}

function crop(text) {
  return text.length > 120 ? text.slice(0, 117) + "..." : text;
}

export function generateAltFromFilename(filename) {
  let name = filename.replace(/\.[^.]+$/, "");

  // Если имя похоже на UUID/HASH → ALT = "Изображение"
  if (isGarbageName(name)) return defaultAlt();

  name = removeGarbage(name);
  name = translateKeywords(name);
  name = smartSemanticTransforms(name);
  name = enrichMeaning(name);
  name = toTitleCase(name);
  name = crop(name);

  return name || defaultAlt();
}
