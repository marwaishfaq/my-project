import express from 'express';
import multer from 'multer';
import uploadSingleImage from '../controllers/ImageController.js';

const router = express.Router();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './images');
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: fileStorageEngine });

router.post('/single', upload.single('profileImage'), uploadSingleImage);

export default router;