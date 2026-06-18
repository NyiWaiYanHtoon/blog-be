const prisma = require('../config/database');

// for public, return only approved comments
const findApprovedByBlogId = async (blogId) => {
  return prisma.comment.findMany({
    where: { blog_id: blogId, status: 'approved' },
    orderBy: { created_at: 'desc' },
  });
};

// for public, submit a pending comment
const create = async ({ blogId, authorName, content }) => {
  return prisma.comment.create({
    data: { blog_id: blogId, author_name: authorName, content, status: 'pending' },
  });
};

// admin crud operations

const findAll = async (status) => {
  return prisma.comment.findMany({
    where: status ? { status } : {},
    orderBy: { created_at: 'desc' },
    include: { blog: { select: { title: true, slug: true } } },
  });
};

const findById = async (id) => {
  return prisma.comment.findUnique({ where: { id } });
};

const updateStatus = async (id, status) => {
  return prisma.comment.update({ where: { id }, data: { status } });
};

module.exports = { findApprovedByBlogId, create, findAll, findById, updateStatus };