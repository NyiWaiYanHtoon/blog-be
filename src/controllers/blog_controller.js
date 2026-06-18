const blogService = require('../services/blog_service');

const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || '';
    const result = await blogService.getBlogs({ page, search });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const blog = await blogService.getBlogBySlug(req.params.slug);
    res.json(blog);
    blogService.incrementViewCount(blog.id);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getApprovedComments = async (req, res) => {
  try {
    const comments = await blogService.getApprovedComments(req.params.slug);
    res.json(comments);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const submitComment = async (req, res) => {
  try {
    const { authorName, content } = req.body;
    const comment = await blogService.submitComment(req.params.slug, { authorName, content });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getBlogs, getBlogBySlug, getApprovedComments, submitComment };