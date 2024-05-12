import type { ImageFragment } from "../graphql/__generated__/operations";
import { logger } from "./logger";

export const getFileAttributes = (file: ImageFragment) => {
  return file.File.data.attributes;
};
export const getImageUrl = (file: ImageFragment) => {
  const { url } = getFileAttributes(file);
  return buildImageUrl(url);
};

export interface MappedImage {
  source: { height: number; width: number; url: string };
  alternativeText: string;
  preview: { height: number; width: number; url: string };
  large: { height: number; width: number; url: string };
}
export const buildImageUrl = (path: string) =>
  `${import.meta.env.STRAPI_URL}${path}`;

export function mapImages(imageList: ImageFragment[]): MappedImage[] {
  logger.info("Mapping images for image gallery", { total: imageList.length });
  return imageList.map((image) => {
    const attr = getFileAttributes(image);

    const largeImage = {
      height: attr.formats.large?.height || attr.height,
      width: attr.formats.large?.width || attr.width,
      url: buildImageUrl(attr.formats.large?.url || attr.url),
    };
    const previewImage = {
      height: attr.formats.medium?.height || attr.height,
      width: attr.formats.medium?.width || attr.width,
      url: buildImageUrl(attr.formats.medium?.url || attr.url),
    };
    const sourceImage = {
      height: attr.height,
      width: attr.width,
      url: buildImageUrl(attr.url),
    };

    return {
      source: sourceImage,
      alternativeText: getFileAttributes(image).alternativeText,
      preview: previewImage,
      large: largeImage,
    };
  });
}
