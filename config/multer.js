import multer, { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos GIF'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});

export default upload;