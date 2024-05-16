const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function registerUser(name, email, password) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });

  if (existingUser) {
    const error = new Error('User with this email already exists');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,  // Хэшированный пароль сохраняется в базе данных
    },
  });

  return newUser;
}

async function loginUser(email, password) {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return null;
  }

  return user;
}

module.exports = {
  registerUser,
  loginUser,
  prisma,
};
