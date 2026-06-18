const blogRepository = require('../repositories/blog_repo');
const commentRepository = require('../repositories/comment_repo');

// for validating thai characters only
const THAI_REGEX = /^[ก-๙0-9\s]+$/;

const getBlogs = async ({ page, search }) => {
  const limit = 10;
  const { blogs, total } = await blogRepository.findPublished({ page, limit, search });

  return {
    data: blogs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getBlogBySlug = async (slug) => {
  const blog = await blogRepository.findBySlug(slug);
  if (!blog) throw new Error('Blog not found');
  return blog;
};

const incrementViewCount = async (id) => {
  blogRepository.incrementViewCount(id);
};

const getApprovedComments = async (slug) => {
  const blog = await blogRepository.findBySlug(slug);
  if (!blog) throw new Error('Blog not found');
  return commentRepository.findApprovedByBlogId(blog.id);
};

const submitComment = async (slug, { authorName, content }) => {
  if (!authorName?.trim()) throw new Error('Author name is required');
  if (!content?.trim()) throw new Error('Comment content is required');
  if (!THAI_REGEX.test(content.trim()))
    throw new Error('Comment must contain only Thai characters and/or numbers');

  const blog = await blogRepository.findBySlug(slug);
  if (!blog) throw new Error('Blog not found');

  return commentRepository.create({ blogId: blog.id, authorName, content });
};

module.exports = { getBlogs, getBlogBySlug, incrementViewCount, getApprovedComments, submitComment };