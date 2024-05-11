import type { ImageFragment } from "../graphql/__generated__/operations";
import { importImage } from "astro-imagetools/api";
import { logger } from "./logger";

export const getFileAttributes = (file: ImageFragment) => {
  return file.File.data.attributes;
};
export const getImageUrl = (file: ImageFragment) => {
  const { url } = getFileAttributes(file);
  return buildImageUrl(url);
};

export interface MappedImage {
  url: string;
  alternativeText: string;
  preview: string;
  large: { height: string; width: string; url: string };
}
export const buildImageUrl = (path: string) =>
  `${import.meta.env.STRAPI_URL}${path}`;
export async function mapImages(
  imageList: ImageFragment[],
): Promise<MappedImage[]> {
  logger.info("Mapping images for image gallery", { total: imageList.length });
  return Promise.all(
    imageList.map(async (i) => {
      const attr = getFileAttributes(i);
      const sourceUrl = getImageUrl(i);

      const largeImage = {
        height: attr.formats.large?.height || attr.height,
        width: attr.formats.large?.width || attr.width,
        url: await importImage(
          buildImageUrl(attr.formats.large?.url || attr.url),
        ),
      };
      return {
        url: sourceUrl,
        alternativeText: getFileAttributes(i).alternativeText,
        preview: attr.formats.medium
          ? buildImageUrl(attr.formats.medium.url)
          : sourceUrl,
        large: largeImage,
      };
    }),
  ).catch((err) => {
    logger.error("Failed to map images", { error: err.message });
    return [];
  });
}
