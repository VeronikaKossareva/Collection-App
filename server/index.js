const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { registerUser, loginUser } = require('../prisma/PrismaClient');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const secretKey = 'your_secret_key';

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log("Token received:", token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

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
    const user = await loginUser(email, password);

    if (!user) {
      return res.status(401).json({ message: 'User not found or password incorrect' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

app.get('/users/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
