import type { ImageFragment } from "../graphql/__generated__/operations";

export const getFileAttributes = (file: ImageFragment) => {
  return file.File.data.attributes;
};
export const getImageUrl = (file: ImageFragment) => {
  const { url } = getFileAttributes(file);
  return buildImageUrl(url);
};

export const buildImageUrl = (path: string) =>
  `${import.meta.env.STRAPI_URL}${path}`;
