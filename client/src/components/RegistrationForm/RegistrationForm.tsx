import { FC, FormEventHandler, useState } from 'react'; // Импортируем FC, FormEventHandler и useState из react для типизации компонента и работы с состоянием
import { FormField } from '../FormField';
import { Button } from '../Button';
import './RegistrationForm.css';
import { useMutation } from '@tanstack/react-query'; // Импортируем хук useMutation для выполнения мутаций
import { registerUser } from '../../api/User'; // Импортируем функцию registerUser для регистрации пользователя
import { queryClient } from '../../api/queryClient'; // Импортируем экземпляр queryClient для управления состоянием кэша запросов

// Компонент RegistrationForm для отображения формы регистрации пользователя
export const RegistrationForm: FC = () => {
  const [name, setUsername] = useState(''); // Состояние для имени пользователя
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Состояние для пароля пользователя
  // const [error, setError] = useState('');

  // Используем хук useMutation для выполнения мутации регистрации пользователя
  const registerMutation = useMutation(
    {
      mutationFn: () => registerUser(name, email, password), // Функция для выполнения мутации
    },
    queryClient // Передаем экземпляр queryClient для управления состоянием кэша запросов
  );

  // const registerMutation = useMutation({
  //   mutationFn: () => registerUser(name, email, password),
  //   onSuccess: () => {
  //     // обработка успешной регистрации, например, редирект или сообщение пользователю
  //     console.log('пользователь зарегестрирован');
  //   },
  //   onError: (error) => {
  //     // обработка ошибки
  //     setError(error instanceof Error ? error.message : "Произошла ошибка при регистрации");
  //   }
  // });

  // Обработчик отправки формы
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault(); // Отменяем стандартное поведение формы

    registerMutation.mutate(); // Вызываем мутацию регистрации пользователя
  };

  // Возвращаем JSX компонента RegistrationForm
  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      {/* Поле ввода имени пользователя */}
      <FormField label="Username">
        <input className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)} // Обновляем состояние имени пользователя при изменении значения поля
          value={name} // Устанавливаем значение поля ввода равным текущему значению состояния
        />
      </FormField>

      <FormField label="Email">
        <input className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800" 
          type="text"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
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
      {registerMutation.error && <span className='bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded'>{registerMutation.error.message}</span>}

      {/* Кнопка отправки формы */}
      <Button
        type="submit"
        title="Sign Up"
        isLoading={registerMutation.isPending} /> {/* Показываем индикатор загрузки, если мутация находится в процессе выполнения */}
    </form>
  );
};
