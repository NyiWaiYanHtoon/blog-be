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
      title: 'Building a REST API with Express and Node.js',
      slug: 'building-rest-api-express-nodejs',
      content: 'Express.js is the most popular Node.js framework for building REST APIs. In this guide, we cover routing, middleware, error handling, and best practices for structuring your project. We will also look at how to validate request data and return meaningful HTTP status codes.',
      cover_image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      is_published: true,
      view_count: 512,
      created_at: new Date('2026-01-05'),
    },
    {
      title: 'React Hooks: A Complete Reference',
      slug: 'react-hooks-complete-reference',
      content: 'React Hooks transformed how we write components. This article covers useState, useEffect, useContext, useReducer, useMemo, useCallback, and useRef with practical examples for each. You will learn when to use each hook and common mistakes to avoid.',
      cover_image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      is_published: true,
      view_count: 890,
      created_at: new Date('2026-01-12'),
    },
    {
      title: 'PostgreSQL Performance Tuning',
      slug: 'postgresql-performance-tuning',
      content: 'Slow queries can kill your application performance. This guide walks through EXPLAIN ANALYZE, index strategies, query optimization, connection pooling, and vacuum settings. Learn how to identify bottlenecks and fix them systematically.',
      cover_image_url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
      is_published: true,
      view_count: 345,
      created_at: new Date('2026-01-18'),
    },
    {
      title: 'Tailwind CSS Layout Patterns',
      slug: 'tailwind-css-layout-patterns',
      content: 'Mastering layout is the foundation of great UI. This article covers flexbox and grid patterns in Tailwind, responsive design strategies, centering techniques, and common component layouts like sidebars, cards, and navbars.',
      cover_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      is_published: true,
      view_count: 278,
      created_at: new Date('2026-01-25'),
    },
    {
      title: 'JWT vs Session Authentication',
      slug: 'jwt-vs-session-authentication',
      content: 'Choosing the right authentication strategy matters. We compare JWT and session-based auth across security, scalability, and implementation complexity. Includes code examples for both approaches in Express.js and guidance on when to use each.',
      cover_image_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800',
      is_published: true,
      view_count: 634,
      created_at: new Date('2026-02-02'),
    },
    {
      title: 'Prisma vs Sequelize vs TypeORM',
      slug: 'prisma-vs-sequelize-vs-typeorm',
      content: 'Three major ORMs for Node.js, each with different philosophies. We compare developer experience, type safety, migration workflows, performance, and community support. By the end you will know which ORM fits your project.',
      cover_image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
      is_published: true,
      view_count: 421,
      created_at: new Date('2026-02-10'),
    },
    {
      title: 'Deploying Full Stack Apps on the Cloud',
      slug: 'deploying-fullstack-apps-cloud',
      content: 'Step-by-step guide to deploying a React frontend on Vercel, an Express backend on Render, and a PostgreSQL database on Supabase. Covers environment variables, CORS configuration, and CI/CD with GitHub Actions.',
      cover_image_url: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
      is_published: true,
      view_count: 198,
      created_at: new Date('2026-02-18'),
    },
    {
      title: 'Understanding Async/Await in JavaScript',
      slug: 'understanding-async-await-javascript',
      content: 'Async/await makes asynchronous code readable and maintainable. This guide covers the event loop, promises, async functions, error handling with try/catch, parallel execution with Promise.all, and common pitfalls like forgetting await.',
      cover_image_url: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800',
      is_published: true,
      view_count: 756,
      created_at: new Date('2026-03-01'),
    },
    {
      title: 'Git Branching Strategies for Teams',
      slug: 'git-branching-strategies-teams',
      content: 'A good branching strategy prevents merge conflicts and keeps your codebase stable. We cover Gitflow, trunk-based development, and feature flags. Includes practical examples of pull request workflows and code review best practices.',
      cover_image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      is_published: true,
      view_count: 303,
      created_at: new Date('2026-03-08'),
    },
    {
      title: 'Docker for Node.js Developers',
      slug: 'docker-for-nodejs-developers',
      content: 'Containerizing your Node.js app with Docker ensures consistency across environments. This article covers writing a Dockerfile, multi-stage builds, docker-compose for local development, and pushing images to Docker Hub.',
      cover_image_url: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=800',
      is_published: true,
      view_count: 487,
      created_at: new Date('2026-03-15'),
    },
    {
      title: 'Introduction to TypeScript Generics',
      slug: 'introduction-typescript-generics',
      content: 'Generics are one of the most powerful features of TypeScript. This guide explains generic functions, generic interfaces, generic classes, and constraints. You will learn how to write reusable, type-safe code that works across different types.',
      cover_image_url: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800',
      is_published: false,
      view_count: 0,
      created_at: new Date('2026-04-01'),
    },
    {
      title: 'Web Security: OWASP Top 10 Explained',
      slug: 'web-security-owasp-top-10',
      content: 'The OWASP Top 10 is the standard reference for web application security. We go through each vulnerability — injection, broken auth, XSS, insecure deserialization, and more — with code examples showing vulnerable and secure implementations.',
      cover_image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
      is_published: false,
      view_count: 0,
      created_at: new Date('2026-04-10'),
    },
    {
      title: 'React Query vs Redux Toolkit',
      slug: 'react-query-vs-redux-toolkit',
      content: 'State management has evolved. React Query handles server state beautifully while Redux Toolkit shines for complex client state. We compare caching, devtools, boilerplate, and learning curves to help you pick the right tool.',
      cover_image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      is_published: false,
      view_count: 0,
      created_at: new Date('2026-04-20'),
    },
    {
      title: 'Building Real-time Features with WebSockets',
      slug: 'building-realtime-features-websockets',
      content: 'Real-time features like live chat, notifications, and collaborative editing require WebSockets. This guide covers the WebSocket protocol, implementing a server with ws and Socket.io, and connecting from a React client.',
      cover_image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      is_published: false,
      view_count: 0,
      created_at: new Date('2026-05-01'),
    },
    {
      title: 'Clean Code Principles for JavaScript',
      slug: 'clean-code-principles-javascript',
      content: 'Writing clean code is a professional responsibility. We cover naming conventions, function design, avoiding side effects, SOLID principles, and refactoring techniques — all with JavaScript examples you can apply immediately.',
      cover_image_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
      is_published: false,
      view_count: 0,
      created_at: new Date('2026-05-15'),
    },
  ];

  const blogs = await Promise.all(
    blogData.map((data) => prisma.blog.create({ data }))
  );
  console.log('✓ Blogs seeded');

  // ── Blog Images ─────────────────────────────────────────
  const imageData = [
    // Blog 0 — Express REST API (6 images)
    { blog_id: blogs[0].id, image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600', sort_order: 1 },
    { blog_id: blogs[0].id, image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600', sort_order: 2 },
    { blog_id: blogs[0].id, image_url: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600', sort_order: 3 },
    { blog_id: blogs[0].id, image_url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600', sort_order: 4 },
    { blog_id: blogs[0].id, image_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600', sort_order: 5 },
    { blog_id: blogs[0].id, image_url: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=600', sort_order: 6 },

    // Blog 1 — React Hooks (4 images)
    { blog_id: blogs[1].id, image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600', sort_order: 1 },
    { blog_id: blogs[1].id, image_url: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=600', sort_order: 2 },
    { blog_id: blogs[1].id, image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', sort_order: 3 },
    { blog_id: blogs[1].id, image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600', sort_order: 4 },

    // Blog 2 — PostgreSQL (3 images)
    { blog_id: blogs[2].id, image_url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600', sort_order: 1 },
    { blog_id: blogs[2].id, image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600', sort_order: 2 },
    { blog_id: blogs[2].id, image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600', sort_order: 3 },

    // Blog 3 — Tailwind (5 images)
    { blog_id: blogs[3].id, image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', sort_order: 1 },
    { blog_id: blogs[3].id, image_url: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600', sort_order: 2 },
    { blog_id: blogs[3].id, image_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600', sort_order: 3 },
    { blog_id: blogs[3].id, image_url: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=600', sort_order: 4 },
    { blog_id: blogs[3].id, image_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600', sort_order: 5 },

    // Blog 4 — JWT Auth (2 images)
    { blog_id: blogs[4].id, image_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600', sort_order: 1 },
    { blog_id: blogs[4].id, image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600', sort_order: 2 },

    // Blog 5 — Prisma vs others (4 images)
    { blog_id: blogs[5].id, image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600', sort_order: 1 },
    { blog_id: blogs[5].id, image_url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600', sort_order: 2 },
    { blog_id: blogs[5].id, image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600', sort_order: 3 },
    { blog_id: blogs[5].id, image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600', sort_order: 4 },

    // Blog 6 — Deploying (3 images)
    { blog_id: blogs[6].id, image_url: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600', sort_order: 1 },
    { blog_id: blogs[6].id, image_url: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=600', sort_order: 2 },
    { blog_id: blogs[6].id, image_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600', sort_order: 3 },

    // Blog 7 — Async/Await (2 images)
    { blog_id: blogs[7].id, image_url: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600', sort_order: 1 },
    { blog_id: blogs[7].id, image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600', sort_order: 2 },

    // Blog 8 — Git (3 images)
    { blog_id: blogs[8].id, image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600', sort_order: 1 },
    { blog_id: blogs[8].id, image_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600', sort_order: 2 },
    { blog_id: blogs[8].id, image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600', sort_order: 3 },

    // Blog 9 — Docker (6 images)
    { blog_id: blogs[9].id, image_url: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=600', sort_order: 1 },
    { blog_id: blogs[9].id, image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600', sort_order: 2 },
    { blog_id: blogs[9].id, image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600', sort_order: 3 },
    { blog_id: blogs[9].id, image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600', sort_order: 4 },
    { blog_id: blogs[9].id, image_url: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=600', sort_order: 5 },
    { blog_id: blogs[9].id, image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600', sort_order: 6 },
  ];

  await prisma.blogImage.createMany({ data: imageData });
  console.log('✓ Blog images seeded');

  // ── Comments ─────────────────────────────────────────────
  const commentData = [
    { blog_id: blogs[0].id, author_name: 'สมชาย ใจดี',         content: 'บทความนี้ดีมากเลยครับ เข้าใจง่ายมาก',               status: 'approved', created_at: new Date('2026-01-07') },
    { blog_id: blogs[0].id, author_name: 'มาลี รักเรียน',       content: 'ขอบคุณมากนะคะ ได้ความรู้เยอะมากเลย',               status: 'approved', created_at: new Date('2026-01-08') },
    { blog_id: blogs[0].id, author_name: 'ธนภัทร โค้ดดี',      content: 'อยากให้มีตัวอย่างเพิ่มเติมอีกครับ',                 status: 'pending',  created_at: new Date('2026-01-09') },
    { blog_id: blogs[1].id, author_name: 'วรรณา เทคโน',         content: 'อธิบาย hooks ได้ชัดเจนมากเลยค่ะ',                  status: 'approved', created_at: new Date('2026-01-14') },
    { blog_id: blogs[1].id, author_name: 'ประสิทธิ์ แบ็กเอนด์', content: 'useCallback กับ useMemo ยังสับสนอยู่เลยครับ',       status: 'pending',  created_at: new Date('2026-01-15') },
    { blog_id: blogs[1].id, author_name: 'กัญญา สวยงาม',        content: 'เพิ่งเริ่มเรียน react ได้เลยมาเจอบทความนี้ดีมากค่ะ', status: 'approved', created_at: new Date('2026-01-16') },
    { blog_id: blogs[2].id, author_name: 'นพดล ฐานข้อมูล',      content: 'EXPLAIN ANALYZE ช่วยได้มากเลยครับ ขอบคุณ',          status: 'approved', created_at: new Date('2026-01-20') },
    { blog_id: blogs[2].id, author_name: 'ศิริพร นักพัฒนา',     content: 'อยากให้อธิบายเรื่อง index เพิ่มเติมด้วยนะคะ',       status: 'pending',  created_at: new Date('2026-01-21') },
    { blog_id: blogs[3].id, author_name: 'อภิชาติ ดีไซน์',      content: 'tailwind เปลี่ยนชีวิตการทำงานไปเลยครับ 555',        status: 'approved', created_at: new Date('2026-01-27') },
    { blog_id: blogs[3].id, author_name: 'ปิยะ ฟรอนต์เอนด์',   content: 'grid กับ flex ยังงงอยู่บ้างครับ มีตัวอย่างเพิ่มได้ไหม', status: 'rejected', created_at: new Date('2026-01-28') },
    { blog_id: blogs[4].id, author_name: 'ณัฐพล ซีเคียวริตี้',  content: 'เข้าใจความแตกต่างของ jwt กับ session มากขึ้นเลยครับ', status: 'approved', created_at: new Date('2026-02-04') },
    { blog_id: blogs[4].id, author_name: 'อรทัย โปรแกรมเมอร์',  content: 'refresh token ทำยังไงครับ มีบทความเพิ่มเติมไหม',     status: 'pending',  created_at: new Date('2026-02-05') },
    { blog_id: blogs[5].id, author_name: 'วิชัย ออร์เอ็ม',      content: 'prisma ดีกว่า sequelize มากเลยครับ type safety เยี่ยม', status: 'approved', created_at: new Date('2026-02-12') },
    { blog_id: blogs[5].id, author_name: 'สุภาพร คิวแอล',       content: 'เปรียบเทียบได้ครบถ้วนดีมากค่ะ ขอบคุณนะคะ',          status: 'rejected', created_at: new Date('2026-02-13') },
    { blog_id: blogs[6].id, author_name: 'ชาญชัย เดพลอย',       content: 'deploy ตาม guide นี้ได้เลยเลยครับ ขอบคุณมาก',        status: 'approved', created_at: new Date('2026-02-20') },
    { blog_id: blogs[7].id, author_name: 'ภัทรา อะซิงค์',       content: 'Promise.all ไม่เคยรู้ว่าใช้แบบนี้ได้ ขอบคุณค่ะ',     status: 'approved', created_at: new Date('2026-03-03') },
    { blog_id: blogs[7].id, author_name: 'กิตติพงษ์ เจเอส',     content: 'อยากให้มีบทความเรื่อง Promise.race ด้วยครับ',        status: 'pending',  created_at: new Date('2026-03-04') },
    { blog_id: blogs[8].id, author_name: 'มนัส กิต',             content: 'gitflow ใช้ในทีมได้ดีมากเลยครับ',                   status: 'approved', created_at: new Date('2026-03-10') },
    { blog_id: blogs[9].id, author_name: 'ลลิตา ด็อกเกอร์',     content: 'docker-compose สะดวกมากเลยค่ะ ขอบคุณ',               status: 'approved', created_at: new Date('2026-03-17') },
    { blog_id: blogs[9].id, author_name: 'สุรชัย คอนเทนเนอร์',  content: 'multi-stage build ลด image size ได้เยอะมากเลยครับ',  status: 'pending',  created_at: new Date('2026-03-18') },
  ];

  await prisma.comment.createMany({ data: commentData });
  console.log('✓ Comments seeded');

  console.log('\n✅ All done! Summary:');
  console.log('   Users    : 1   (admin / admin1234)');
  console.log('   Blogs    : 15  (10 published, 5 drafts)');
  console.log('   Images   : 38  (spread across first 10 blogs, 2–6 images each)');
  console.log('   Comments : 20  (10 approved, 7 pending, 3 rejected)');
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());