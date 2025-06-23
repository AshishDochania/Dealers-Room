import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'deal_files',
    allowed_formats: ['pdf', 'docx', 'png', 'jpg'],
  },
});

const upload = multer({ storage });

export default upload;
