import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import { nanoid } from "nanoid";

export const MEDIA_DIR = path.join(process.cwd(), "public", "products");
export const MEDIA_URL_PREFIX = "/products/";

export const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAIN_MAX_SIDE = 1600;
export const THUMB_MAX_SIDE = 600;
export const WEBP_QUALITY = 82;

export type UploadedImage = {
  id: string;
  url: string;
  thumbUrl: string;
  width: number;
  height: number;
  bytes: number;
};

async function ensureMediaDir(): Promise<void> {
  await fs.mkdir(MEDIA_DIR, { recursive: true });
}

function sanitizeId(id: string): string | null {
  if (!/^[A-Za-z0-9_-]{4,32}$/.test(id)) return null;
  return id;
}

export function mediaIdFromUrl(url: string): string | null {
  if (!url.startsWith(MEDIA_URL_PREFIX)) return null;
  const fileName = url.slice(MEDIA_URL_PREFIX.length);
  const match = fileName.match(/^([A-Za-z0-9_-]{4,32})(?:\.thumb)?\.webp$/);
  return match ? match[1] : null;
}

export async function saveUploadedImage(
  input: ArrayBuffer | Buffer,
  contentType: string | null,
): Promise<UploadedImage> {
  if (!contentType || !ALLOWED_MIME.has(contentType)) {
    throw new Error("Неподдерживаемый формат изображения");
  }
  const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input);
  if (buffer.byteLength === 0) {
    throw new Error("Пустой файл");
  }
  if (buffer.byteLength > MAX_IMAGE_BYTES) {
    throw new Error("Файл больше 5 МБ");
  }

  await ensureMediaDir();
  const id = nanoid(12);
  const mainName = `${id}.webp`;
  const thumbName = `${id}.thumb.webp`;
  const mainPath = path.join(MEDIA_DIR, mainName);
  const thumbPath = path.join(MEDIA_DIR, thumbName);

  const pipeline = sharp(buffer, { failOn: "error" }).rotate();
  const meta = await pipeline.metadata();
  if (!meta.width || !meta.height) {
    throw new Error("Не удалось определить размеры изображения");
  }

  const mainImage = await pipeline
    .clone()
    .resize({
      width: MAIN_MAX_SIDE,
      height: MAIN_MAX_SIDE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toBuffer({ resolveWithObject: true });

  await fs.writeFile(mainPath, mainImage.data);

  const thumb = await pipeline
    .clone()
    .resize({
      width: THUMB_MAX_SIDE,
      height: THUMB_MAX_SIDE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 78, effort: 4 })
    .toBuffer();

  await fs.writeFile(thumbPath, thumb);

  return {
    id,
    url: `${MEDIA_URL_PREFIX}${mainName}`,
    thumbUrl: `${MEDIA_URL_PREFIX}${thumbName}`,
    width: mainImage.info.width,
    height: mainImage.info.height,
    bytes: mainImage.data.byteLength,
  };
}

export async function deleteUploadedImage(id: string): Promise<boolean> {
  const safeId = sanitizeId(id);
  if (!safeId) return false;
  await ensureMediaDir();
  const main = path.join(MEDIA_DIR, `${safeId}.webp`);
  const thumb = path.join(MEDIA_DIR, `${safeId}.thumb.webp`);
  let removed = false;
  for (const file of [main, thumb]) {
    try {
      await fs.unlink(file);
      removed = true;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
        throw err;
      }
    }
  }
  return removed;
}
