import { z } from 'zod'; // Импортируем библиотеку zod для валидации данных
import { LogoutButton } from '../components/LogoutButton';
// import { validateResponse } from './validateResponse'; // Импортируем функцию валидации ответа

// Определяем схему данных пользователя
export const UserSchema = z.object({
  id: z.string(), // ID пользователя (строка)
  email: z.string().email(),
  name: z.string(), // Имя пользователя (строка)
})

// Тип данных пользователя, получаемый из схемы UserSchema
export type User = z.infer<typeof UserSchema>;

// Функция для получения данных пользователя по его ID
export function fetchUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`) // Отправляем GET-запрос на сервер для получения данных пользователя
    .then((response) => response.json()) // Преобразуем ответ в формат JSON
    .then((data) => UserSchema.parse(data)); // Проверяем полученные данные по схеме UserSchema
}

// Функция для регистрации нового пользователя
export function registerUser(name: string, email: string, password: string): Promise<void> {
  return fetch("/api/register", { // Отправляем POST-запрос на сервер для регистрации нового пользователя
    method: "POST", // Метод запроса
    headers: {
      "Content-Type": "application/json", // Устанавливаем заголовок Content-Type для передачи данных в формате JSON
    },
    body: JSON.stringify({ name, email, password }), // Преобразуем данные в формат JSON и отправляем на сервер
  }).then(response => {
    if (!response.ok) {
      if (response.status === 409) {
        throw new Error('User with this email already exists');
      }
      throw new Error('Registration failed');
    }
    return response.json();
  });
}

// Функция для аутентификации пользователя
export function login(email: string, password: string, ): Promise<void> {
  return fetch("/api/login", { // Отправляем POST-запрос на сервер для аутентификации пользователя
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Устанавливаем заголовок Content-Type для передачи данных в формате JSON
    },
    body: JSON.stringify({ email, password }) // Преобразуем данные в формат JSON и отправляем на сервер
  })
    // .then(validateResponse) // Проверяем ответ на валидность
    // .then(() => undefined); // Возвращаем Promise, который разрешается без значения в случае успешного выполнения запроса
    .then(response => response.json())
    .then(() => {
      LogoutButton;
      // Обработка успешного входа, например, перенаправление на главную страницу
    })
    .catch(error => {
      console.error('Error:', error);
      // Обработка ошибки входа
    });
}


// export function logoutUser(): Promise:<void> {

// }

// Функция для получения данных текущего пользователя
// export function fetchMe(): Promise<User> {
//   return fetch("/api/users/me") // Отправляем GET-запрос на сервер для получения данных текущего пользователя
//     // .then(validateResponse) // Проверяем ответ на валидность
//     .then(response => response.json()) // Преобразуем ответ в формат JSON
//     .then((data) => UserSchema.parse(data)); // Проверяем полученные данные по схеме UserSchema
// }

export function fetchMe(): Promise<User> {
  const token = localStorage.getItem('token');

  return fetch('/api/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => UserSchema.parse(data)); // Проверяем полученные данные по схеме UserSchema
}
