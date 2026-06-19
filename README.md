# DevBlog — Backend

Express REST API with JWT auth, Prisma ORM, PostgreSQL, and Supabase Storage.

## Live URL
https://blog-be-3emd.onrender.com

## Tech Stack
Node.js, Express.js, Prisma ORM, PostgreSQL (Supabase), Supabase Storage, JWT, bcrypt, Multer

## Architecture
Route → Controller → Service → Repository → Database

## Setup

```bash
npm install
```

Create `.env`:
```env
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
JWT_SECRET=your_secret
SUPABASE_URL=https://your-ref.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
```

```bash
npx prisma generate
npm run seed
npm run dev
```

## API Endpoints

| Method | Endpoint | Auth |
|---|---|---|
| POST | /api/auth/login | ❌ |
| GET | /api/blogs | ❌ |
| GET | /api/blogs/:slug | ❌ |
| GET | /api/blogs/:slug/comments | ❌ |
| POST | /api/blogs/:slug/comments | ❌ |
| GET | /api/admin/blogs | ✅ |
| GET | /api/admin/blogs/:id | ✅ |
| POST | /api/admin/blogs | ✅ |
| PUT | /api/admin/blogs/:id | ✅ |
| DELETE | /api/admin/blogs/:id | ✅ |
| PATCH | /api/admin/blogs/:id/publish | ✅ |
| PATCH | /api/admin/blogs/:id/unpublish | ✅ |
| GET | /api/admin/comments | ✅ |
| PATCH | /api/admin/comments/:id/approve | ✅ |
| PATCH | /api/admin/comments/:id/reject | ✅ |
| POST | /api/upload/image | ✅ |

## Deployment
Deployed on Render.
- Build: `npm install && npx prisma generate`
- Start: `node src/server.js`

## Comment Validation
Comments must contain only Thai characters and/or numbers.
Regex: `/^[ก-๙0-9\s]+$/` — validated on both frontend and backend.