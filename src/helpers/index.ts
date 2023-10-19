import slugify from 'slugify';

export const strToSlug = (str: string): string =>
  slugify(str, {
    remove: /[^0-9a-zA-Z\s]/gim,
    lower: true,
    trim: true,
  });
