const express = require('express');
const router = express.Router();
const adminBlogController = require('../controllers/admin_blog_controller');
const adminCommentController = require('../controllers/admin_comment_controller');
const { authenticate } = require('../middlewares/auth_middleware');

router.use(authenticate);

// Blog routes
router.get('/blogs', adminBlogController.getAllBlogs);
router.get('/blogs/:id', adminBlogController.getBlogById);
router.post('/blogs', adminBlogController.createBlog);
router.put('/blogs/:id', adminBlogController.updateBlog);
router.delete('/blogs/:id', adminBlogController.deleteBlog);
router.patch('/blogs/:id/publish', adminBlogController.publishBlog);
router.patch('/blogs/:id/unpublish', adminBlogController.unpublishBlog);

// Comment routes (will add handlers next)
router.get('/comments', adminCommentController.getAllComments);
router.patch('/comments/:id/approve', adminCommentController.approveComment);
router.patch('/comments/:id/reject', adminCommentController.rejectComment);

module.exports = router;