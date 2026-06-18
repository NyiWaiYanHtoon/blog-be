const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog_controller');

router.get('/', blogController.getBlogs);
router.get('/:slug', blogController.getBlogBySlug);
router.get('/:slug/comments', blogController.getApprovedComments);
router.post('/:slug/comments', blogController.submitComment);

module.exports = router;