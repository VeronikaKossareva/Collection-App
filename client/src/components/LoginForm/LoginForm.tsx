import { FC, FormEventHandler, useState } from 'react'; // Импортируем FC, FormEventHandler и useState из react для типизации компонента и работы с состоянием
import { useMutation } from '@tanstack/react-query'; // Импортируем хук useMutation для выполнения мутаций
import { FormField } from '../FormField';
import { Button } from '../Button';
import './LoginForm.css';
import { login } from '../../api/User'; // Импортируем функцию login для входа пользователя
import { queryClient } from '../../api/queryClient'; // Импортируем экземпляр queryClient для управления состоянием кэша запросов

// Компонент LoginForm для отображения формы входа пользователя
export const LoginForm: FC = () => {
  const [email, setEmail] = useState(''); // Состояние для имени пользователя
  const [password, setPassword] = useState(''); // Состояние для пароля пользователя

  // Используем хук useMutation для выполнения мутации входа пользователя
  const loginMutation = useMutation(
    {
      mutationFn: () => login(email, password), // Функция для выполнения мутации
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['users', 'me'] }); // Обновляем кэш информации о пользователе после успешного выполнения мутации
      }
    },
    queryClient // Передаем экземпляр queryClient для управления состоянием кэша запросов
  );

  // Обработчик отправки формы
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault(); // Отменяем стандартное поведение формы

    loginMutation.mutate(); // Вызываем мутацию входа пользователя
  };

  // Возвращаем JSX компонента LoginForm
  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      {/* Поле ввода имени пользователя */}
      <FormField label="Email">
        <input className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
          type="text"
          name="email"
          onChange={(event) => setEmail(event.target.value)} // Обновляем состояние имени пользователя при изменении значения поля
          value={email} // Устанавливаем значение поля ввода равным текущему значению состояния
        />
      </FormField>

      {/* Поле ввода пароля пользователя */}
      <FormField label="Password">
        <input className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)} // Обновляем состояние пароля пользователя при изменении значения поля
          value={password} // Устанавливаем значение поля ввода равным текущему значению состояния
        />
      </FormField>

      {/* Отображаем сообщение об ошибке, если таковая возникла */}
      {loginMutation.error && <span>{loginMutation.error.message}</span>}

      {/* Кнопка отправки формы */}
      <Button type="submit" title="Sign In" isLoading={loginMutation.isPending} />
    </form>
  );
};
