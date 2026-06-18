const blogRepository = require('../repositories/blog_repo');

const SLUG_REGEX = /^[a-z0-9-]+$/;

const getAllBlogs = async () => {
  return blogRepository.findAll();
};

const getBlogById = async (id) => {
  const blog = await blogRepository.findById(id);
  if (!blog) throw new Error('Blog not found');
  return blog;
};

const createBlog = async ({ title, slug, content, cover_image_url }) => {
  if (!title?.trim()) throw new Error('Title is required');
  if (!slug?.trim()) throw new Error('Slug is required');
  if (!SLUG_REGEX.test(slug)) throw new Error('Invalid slug format');
  if (!content?.trim()) throw new Error('Content is required');

  const existing = await blogRepository.findBySlug(slug);
  if (existing) throw new Error('Slug already exists');

  return blogRepository.create({ title, slug, content, cover_image_url });
};

const updateBlog = async (id, { title, slug, content, cover_image_url }) => {
  const blog = await blogRepository.findById(id);
  if (!blog) throw new Error('Blog not found');

  if (slug) {
    if (!SLUG_REGEX.test(slug)) throw new Error('Invalid slug format');
    const conflict = await blogRepository.findBySlugExcludeId(slug, id);
    if (conflict) throw new Error('Slug already exists');
  }

  return blogRepository.update(id, {
    ...(title && { title }),
    ...(slug && { slug }),
    ...(content && { content }),
    ...(cover_image_url !== undefined && { cover_image_url }),
    updated_at: new Date(),
  });
};

const deleteBlog = async (id) => {
  const blog = await blogRepository.findById(id);
  if (!blog) throw new Error('Blog not found');
  return blogRepository.remove(id);
};

const publishBlog = async (id) => {
  const blog = await blogRepository.findById(id);
  if (!blog) throw new Error('Blog not found');
  if (blog.is_published) throw new Error('Blog is already published');
  return blogRepository.update(id, { is_published: true });
};

const unpublishBlog = async (id) => {
  const blog = await blogRepository.findById(id);
  if (!blog) throw new Error('Blog not found');
  if (!blog.is_published) throw new Error('Blog is already unpublished');
  return blogRepository.update(id, { is_published: false });
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