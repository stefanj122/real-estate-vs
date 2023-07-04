import { existsSync } from 'fs';
import { join } from 'path';
import { Image } from 'src/entities/images.entity';
import { resizeImage } from './resize-image.helper';

export function makeImageUrl(image: Image, imageSize: string): string {
  if (
    !existsSync(join(process.cwd(), 'public', 'images', imageSize, image.name))
  ) {
    resizeImage(image, imageSize);
  }
  return (
    process.env.APP_BASEURL +
    ':' +
    process.env.APP_PORT +
    '/images/' +
    imageSize +
    '/' +
    image.name
  );
}
