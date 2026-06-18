const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user_repo');

const login = async(username, password)=> {

    const user = await userRepository.findByUsername(username);
    if(!user) throw new Error('Invalid credentials');

    console.log("user: ", user);

    const valid = bcrypt.compare(password, user.password_hash);
    if (!valid) throw new Error('Invalid credentials');

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
    console.log("user: ", user);
    return { token, user: { id: user.id, username: user.username, role: user.role } };
}

module.exports= { login }