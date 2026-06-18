require('dotenv').config();
const bcrypt = require('bcrypt');
const prisma = require('../config/database');

async function main() {
  console.log('Seeding database...');

  // Clean existing data
  await prisma.comment.deleteMany();
  await prisma.blogImage.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.user.deleteMany();

  // ── Users ───────────────────────────────────────────────
  const hash = await bcrypt.hash('admin1234', 10);
  await prisma.user.create({
    data: { username: 'admin', password_hash: hash, role: 'admin' },
  });
  console.log('✓ Users seeded');

  // ── Blogs ───────────────────────────────────────────────
  const blogData = [
    {
      title: 'Getting Started with React',
      slug: 'getting-started-with-react',
      content: 'React is a JavaScript library for building user interfaces. It uses a component-based architecture that makes it easy to build complex UIs from small, reusable pieces.',
      cover_image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      is_published: true,
      view_count: 342,
      created_at: new Date('2026-01-10'),
    },
    {
      title: 'Node.js Backend Development',
      slug: 'nodejs-backend-development',
      content: 'Node.js is a runtime environment that allows you to run JavaScript on the server side. It is built on Chrome V8 engine and uses an event-driven, non-blocking I/O model.',
      cover_image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      is_published: true,
      view_count: 210,
      created_at: new Date('2026-01-20'),
    },
    {
      title: 'Mastering Tailwind CSS',
      slug: 'mastering-tailwind-css',
      content: 'Tailwind CSS is a utility-first CSS framework that allows you to build modern websites without leaving your HTML. Learn how to use it effectively in your projects.',
      cover_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      is_published: true,
      view_count: 98,
      created_at: new Date('2026-02-05'),
    },
    {
      title: 'Database Design with PostgreSQL',
      slug: 'database-design-postgresql',
      content: 'PostgreSQL is one of the most powerful open-source relational databases. This guide covers schema design, indexing strategies, and query optimization techniques.',
      cover_image_url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
      is_published: true,
      view_count: 175,
      created_at: new Date('2026-02-15'),
    },
    {
      title: 'JWT Authentication Explained',
      slug: 'jwt-authentication-explained',
      content: 'JSON Web Tokens are a compact and self-contained way to securely transmit information between parties. Learn how to implement JWT authentication in your Express API.',
      cover_image_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800',
      is_published: true,
      view_count: 430,
      created_at: new Date('2026-03-01'),
    },
    {
      title: 'Prisma ORM Deep Dive',
      slug: 'prisma-orm-deep-dive',
      content: 'Prisma is a next-generation ORM for Node.js and TypeScript. It provides type-safe database access, auto-generated migrations, and an intuitive data model.',
      cover_image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
      is_published: true,
      view_count: 67,
      created_at: new Date('2026-03-15'),
    },
    {
      title: 'Deploying to Vercel and Render',
      slug: 'deploying-vercel-render',
      content: 'Learn how to deploy your full-stack application with the frontend on Vercel and the backend on Render. Covers environment variables, CORS, and CI/CD basics.',
      cover_image_url: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
      is_published: false,
      view_count: 0,
      created_at: new Date('2026-04-01'),
    },
    {
      title: 'React Router v6 Complete Guide',
      slug: 'react-router-v6-guide',
      content: 'React Router v6 introduced major changes including the new Outlet component, nested routes, and layout routes. This guide covers everything you need to know.',
      cover_image_url: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=800',
      is_published: false,
      view_count: 0,
      created_at: new Date('2026-04-10'),
    },
    {
      title: 'Understanding REST API Design',
      slug: 'understanding-rest-api-design',
      content: 'A well-designed REST API is intuitive and easy to use. This article covers naming conventions, HTTP methods, status codes, and versioning strategies.',
      cover_image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      is_published: false,
      view_count: 0,
      created_at: new Date('2026-05-01'),
    },
    {
      title: 'TypeScript for JavaScript Developers',
      slug: 'typescript-for-js-developers',
      content: 'TypeScript adds static typing to JavaScript, helping you catch errors at compile time. This guide is designed for JavaScript developers making the switch.',
      cover_image_url: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800',
      is_published: false,
      view_count: 0,
      created_at: new Date('2026-05-20'),
    },
  ];

  const blogs = await Promise.all(
    blogData.map((data) => prisma.blog.create({ data }))
  );
  console.log('✓ Blogs seeded');

  // ── Blog Images ─────────────────────────────────────────
  // Add images to first 4 blogs only
  const imageData = [
    { blog_id: blogs[0].id, image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600', sort_order: 1 },
    { blog_id: blogs[0].id, image_url: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=600', sort_order: 2 },
    { blog_id: blogs[0].id, image_url: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600', sort_order: 3 },
    { blog_id: blogs[1].id, image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600', sort_order: 1 },
    { blog_id: blogs[1].id, image_url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600', sort_order: 2 },
    { blog_id: blogs[2].id, image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', sort_order: 1 },
    { blog_id: blogs[2].id, image_url: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600', sort_order: 2 },
    { blog_id: blogs[2].id, image_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600', sort_order: 3 },
    { blog_id: blogs[3].id, image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600', sort_order: 1 },
    { blog_id: blogs[3].id, image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600', sort_order: 2 },
  ];

  await prisma.blogImage.createMany({ data: imageData });
  console.log('✓ Blog images seeded');

  // ── Comments ─────────────────────────────────────────────
  const commentData = [
    { blog_id: blogs[0].id, author_name: 'สมชาย ใจดี',      content: 'บทความนี้ดีมากเลยครับ เข้าใจง่ายมาก',         status: 'approved',  created_at: new Date('2026-01-12') },
    { blog_id: blogs[0].id, author_name: 'มาลี รักเรียน',    content: 'ขอบคุณมากนะคะ ได้ความรู้เยอะมากเลย',         status: 'approved',  created_at: new Date('2026-01-15') },
    { blog_id: blogs[0].id, author_name: 'ธนภัทร โค้ดดี',   content: 'อยากให้มีตัวอย่างเพิ่มเติมอีกครับ',           status: 'pending',   created_at: new Date('2026-01-18') },
    { blog_id: blogs[1].id, author_name: 'วรรณา เทคโน',      content: 'อธิบายได้ชัดเจนมากค่ะ ขอบคุณนะคะ',           status: 'approved',  created_at: new Date('2026-01-22') },
    { blog_id: blogs[1].id, author_name: 'ประสิทธิ์ แบ็ค',  content: 'ได้เทคนิคใหม่ๆ ไปใช้งานจริงได้เลยครับ',      status: 'pending',   created_at: new Date('2026-01-25') },
    { blog_id: blogs[2].id, author_name: 'กัญญา สวยงาม',    content: 'ใช้ tailwind มาสักพักแล้วแต่เพิ่งรู้เทคนิคนี้', status: 'approved',  created_at: new Date('2026-02-08') },
    { blog_id: blogs[3].id, author_name: 'นพดล ฐานข้อมูล',  content: 'เนื้อหาครบถ้วนดีมากเลยครับ 10 10',            status: 'rejected',  created_at: new Date('2026-02-18') },
    { blog_id: blogs[4].id, author_name: 'ศิริพร ความปลอดภัย', content: 'เข้าใจ jwt มากขึ้นเยอะเลยค่ะ ขอบคุณมาก',  status: 'approved',  created_at: new Date('2026-03-05') },
    { blog_id: blogs[4].id, author_name: 'อภิชาติ นักพัฒนา', content: 'รอบทความต่อไปด้วยนะครับ',                     status: 'pending',   created_at: new Date('2026-03-08') },
    { blog_id: blogs[5].id, author_name: 'ปิยะ ออร์เอ็ม',   content: 'prisma ดีกว่า sequelize เยอะเลยครับ 555',     status: 'rejected',  created_at: new Date('2026-03-18') },
  ];

  await prisma.comment.createMany({ data: commentData });
  console.log('✓ Comments seeded');

  console.log('\n✅ All done! Summary:');
  console.log('   Users    : 1  (admin / admin1234)');
  console.log('   Blogs    : 10 (6 published, 4 drafts)');
  console.log('   Images   : 10 (spread across first 4 blogs)');
  console.log('   Comments : 10 (4 approved, 3 pending, 2 rejected, across 6 blogs)');
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());