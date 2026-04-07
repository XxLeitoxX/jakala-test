export const getImageProxyUrl = (src: string): string =>
  `/api/image/${encodeURIComponent(src)}`;

