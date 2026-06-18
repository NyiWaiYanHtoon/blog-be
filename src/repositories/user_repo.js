const prisma = require('../config/database')

const findByUsername= async (username)=> {
    const user = prisma.user.findUnique({ where: {username} })
    return user;
}

module.exports = { findByUsername }