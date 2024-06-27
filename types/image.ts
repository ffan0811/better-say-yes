export type ImageSrcProps = {
  value?: string; // file name
  blob?: string; // temp image
};
export type ImageProps = {
  src: ImageSrcProps;
  blurDataUrl?: string;
};
