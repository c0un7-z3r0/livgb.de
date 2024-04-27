import type { GetFrontPageQuery } from "../graphql/__generated__/operations";

export type Image =
  GetFrontPageQuery["frontpage"]["data"]["attributes"]["Images"][0];

export const getFileAttributes = (file: Image) => {
  return file.File.data.attributes;
};
export const getImageUrl = (file: Image) => {
  const { url } = getFileAttributes(file);
  return buildImageUrl(url);
};

export const buildImageUrl = (path: string) =>
  `${import.meta.env.STRAPI_URL}${path}`;
