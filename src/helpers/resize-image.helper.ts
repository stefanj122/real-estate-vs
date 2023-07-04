import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import * as sharp from 'sharp';
import { Image } from 'src/entities/images.entity';

export const resizeImage = async (image: Image, thumbnailSize: string) => {
  const [width, height] = thumbnailSize.split('x');
  const thumbnailPath = join(process.cwd(), 'public', 'images', thumbnailSize);
  if (!existsSync(thumbnailPath)) {
    mkdirSync(thumbnailPath);
  }
  const imagePath = join(process.cwd(), 'uploads', 'images', image.name);

  try {
    await sharp(imagePath)
      .resize(+width, +height)
      .toFile(join(thumbnailPath, image.name));
    return true;
  } catch (e) {
    return false;
  }
};
