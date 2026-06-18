require('dotenv').config();
const bcrypt = require('bcrypt');
const prisma = require('../config/database');

async function main() {
  const username = 'admin';
  const password = 'admin1234';

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    console.log('Admin user already exists.');
    return;
  }

  const password_hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, password_hash, role: 'admin' }
  });

  console.log('Admin user created:', user.username);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());