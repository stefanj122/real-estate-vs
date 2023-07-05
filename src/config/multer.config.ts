import { format } from 'date-format-parse';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const imagesStorage = {
  storage: diskStorage({
    destination: (_req, _file, cb) => {
      const destination = join(__dirname, '../../uploads/images/');
      cb(null, destination);
    },
    filename: (_req, file, cb) => {
      const filename = file.originalname.split('.');
      filename[0] += format(new Date(), '-DD-MM-YY');
      cb(null, filename.join('.'));
    },
  }),
};

export const watermarksStorage = {
  storage: diskStorage({
    destination: (_req, _file, cb) => {
      const destination = join(__dirname, '../../uploads/watermarks/');
      cb(null, destination);
    },
    filename: (_req, file, cb) => {
      const filename = file.originalname;
      const extension = extname(file.originalname);
      cb(null, filename + extension);
    },
  }),
};
