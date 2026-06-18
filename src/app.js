// src/app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth_routes')
const blogRoutes = require('./routes/blog_routes')
const adminRoutes = require('./routes/admin_routes')
const uploadRoutes = require('./routes/upload_routes')

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

module.exports = app;