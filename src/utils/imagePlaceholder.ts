const blurSvg = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 40 30">
    <rect width="40" height="30" fill="#ececec" />
  </svg>`,
);

export const PRODUCT_BLUR_DATA_URL = `data:image/svg+xml;charset=utf-8,${blurSvg}`;

