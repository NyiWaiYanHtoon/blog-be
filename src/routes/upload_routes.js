const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticate } = require('../middlewares/auth_middleware');
const uploadController = require('../controllers/upload_controller');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/image', authenticate, upload.single('image'), uploadController.uploadImage);

module.exports = router;