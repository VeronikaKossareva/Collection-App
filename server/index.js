const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;  // Убедитесь, что порт отличается от порта, который использует фронтенд

// Подключение middleware
app.use(cors());
app.use(bodyParser.json());

// Простой маршрут для тестирования
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
