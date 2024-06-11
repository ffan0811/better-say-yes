import Compressor from "compressorjs";

export const compressImages = async (
  files: File[],
  options?: { quality?: number; maxWidth?: number }
): Promise<File[]> => {
  try {
    const compressedImages: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const image = files[i];
      const result = await new Promise<File | null>((resolve) => {
        new Compressor(image, {
          quality: options?.quality || 0.8,
          maxWidth: options?.maxWidth || 1600,
          async success(compressedImage: File) {
            resolve(compressedImage);
          },
          async error(err: Error) {
            console.error(`Failed to compress image: ${err}`);
            resolve(null); // Resolve with null if there's an error
          },
        });
      });

      if (result) {
        compressedImages.push(result);
      }
    }

    return compressedImages;
  } catch (error) {
    console.error(
      "Error occurred while compressing and uploading images:",
      error
    );
    throw new Error("An unexpected error occurred. Please try again later.");
  }
};
