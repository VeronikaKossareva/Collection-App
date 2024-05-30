import { FC, FormEventHandler, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FormField } from '../FormField';
import { Button } from '../Button';
import { login } from '../../api/User';
import { queryClient } from '../../api/queryClient';

export const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation(
    {
      mutationFn: () => login(email, password),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      }
    },
    queryClient
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    loginMutation.mutate();
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <FormField label="Email">
        <input className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
          type="text"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
      </FormField>

      <FormField label="Password">
        <input className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </FormField>

      {loginMutation.error && <span>{loginMutation.error.message}</span>}

      <Button type="submit" title="Sign In" isLoading={loginMutation.isPending} />
    </form>
  );
};
