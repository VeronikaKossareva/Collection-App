const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function registerUser(name, email, password) {
  // Проверка, существует ли уже пользователь с такой электронной почтой
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

  // Создание нового пользователя, если он не найден
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,  // Важно: Пароль должен быть предварительно хэширован!
    },
  });

  return newUser;
}

async function loginUser(email, password) {
  const user = await prisma.user.findUnique({
    where: { 
      email: email,
      password: password, 
    },
  });

  if (!user) return null; 

  return user;
}

module.exports = {
  registerUser,
  loginUser, 
  prisma,  // Экспорт экземпляра для возможного использования в других частях приложения
};


