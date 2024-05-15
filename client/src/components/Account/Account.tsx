import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../api/User"; // Импортируем функцию fetchMe для получения данных текущего пользователя
import { Loader } from "../Loader"; // Импортируем компонент Loader для отображения загрузки
import { AuthForm } from "../AuthForm"; // Импортируем компонент AuthForm для отображения формы аутентификации
import { queryClient } from "../../api/queryClient"; // Импортируем экземпляр queryClient для управления состоянием кэша запросов
import { LogoutButton } from "../LogoutButton";

// Компонент Account для отображения содержимого аккаунта пользователя
export const Account = () => {
  // Используем хук useQuery для выполнения запроса на получение данных текущего пользователя
  const meQuery = useQuery(
    {
      queryFn: () => fetchMe(), // Функция для выполнения запроса
      queryKey: ['users', 'me'], // Ключ запроса
    },
    queryClient // Передаем экземпляр queryClient для управления кэшем запросов
  );

  // В зависимости от состояния запроса, возвращаем соответствующий компонент
  switch (meQuery.status) {
    case "pending": // Если запрос находится в состоянии ожидания
      return <Loader />; // Отображаем компонент Loader

    case "error": // Если запрос завершился с ошибкой
      return <AuthForm />; // Отображаем компонент AuthForm для аутентификации

    case "success": // Если запрос завершился успешно
      return <LogoutButton />; // Отображаем компонент PostForm для создания поста
  }
};
