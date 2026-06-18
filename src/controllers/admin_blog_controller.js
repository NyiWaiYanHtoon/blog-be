const adminBlogService = require('../services/admin_blog_services');

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await adminBlogService.getAllBlogs();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await adminBlogService.getBlogById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, slug, content, cover_image_url, images } = req.body;
    const blog = await adminBlogService.createBlog({ title, slug, content, cover_image_url, images });
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, slug, content, cover_image_url } = req.body;
    const blog = await adminBlogService.updateBlog(req.params.id, { title, slug, content, cover_image_url });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await adminBlogService.deleteBlog(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const publishBlog = async (req, res) => {
  try {
    const blog = await adminBlogService.publishBlog(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const unpublishBlog = async (req, res) => {
  try {
    const blog = await adminBlogService.unpublishBlog(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  publishBlog,
  unpublishBlog,
};