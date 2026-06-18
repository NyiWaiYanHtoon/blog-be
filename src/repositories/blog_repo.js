const prisma = require('../config/database');

// for public, return only published blogs
const findPublished = async ({ page = 1, limit = 10, search = '' }) => {
  const where = {
    is_published: true,
    ...(search && { title: { contains: search, mode: 'insensitive' } }),
  };

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { created_at: 'desc' },
      include: { images: { orderBy: { sort_order: 'asc' } } },
    }),
    prisma.blog.count({ where }),
  ]);

  return { blogs, total };
};

// for public, return published blog by slug
const findBySlug = async (slug) => {
  return prisma.blog.findUnique({
    where: { slug, is_published: true },
    include: { images: { orderBy: { sort_order: 'asc' } } },
  });
};

// to be incremented everytime blog is retrieved by slug
const incrementViewCount = async (id) => {
  return prisma.blog.update({
    where: { id },
    data: { view_count: { increment: 1 } },
  });
};

// admin crud operations
const findAll = async () => {
  return prisma.blog.findMany({
    orderBy: { created_at: 'desc' },
    include: { images: { orderBy: { sort_order: 'asc' } } },
  });
};

const findById = async (id) => {
  return prisma.blog.findUnique({
    where: { id },
    include: { images: { orderBy: { sort_order: 'asc' } } },
  });
};

const create = async (data) => {
  return prisma.blog.create({ data });
};

const update = async (id, data) => {
  return prisma.blog.update({ where: { id }, data });
};

const remove = async (id) => {
  return prisma.blog.delete({ where: { id } });
};

const findBySlugExcludeId = async (slug, excludeId) => {
  return prisma.blog.findFirst({
    where: { slug, NOT: { id: excludeId } },
  });
};

module.exports = { 
  findPublished,
  findBySlug,
  incrementViewCount,
  findAll,
  findById,
  create,
  update,
  remove,
  findBySlugExcludeId
};