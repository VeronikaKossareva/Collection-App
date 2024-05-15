const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { registerUser, loginUser } = require('../prisma/PrismaClient');

const app = express();
const port = 3001;  // Убедитесь, что порт отличается от порта, который использует фронтенд

// Подключение middleware
app.use(cors());
app.use(bodyParser.json());

// Простой маршрут для тестирования
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await registerUser(name, email, password);
    res.status(201).json({
      message: "User successfully registered",
      user: newUser
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: "Registration failed",
      error: error.message
    });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password)
    if (!user) {
      return res.status(401).json({ message: 'User not found or password incorrect' });
    }
    res.json({ message: "Login successful", user: user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
