const uploadService = require('../services/upload_service');

const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file provided' });

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(req.file.mimetype))
      return res.status(400).json({ message: 'Only JPEG, PNG, and WebP are allowed' });

    if (req.file.size > 5 * 1024 * 1024)
      return res.status(400).json({ message: 'File size must be under 5MB' });

    const result = await uploadService.uploadImage(req.file);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { uploadImage };