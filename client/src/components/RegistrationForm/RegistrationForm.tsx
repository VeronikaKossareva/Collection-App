import { FC, FormEventHandler, useState } from 'react';
import { FormField } from '../FormField';
import { Button } from '../Button';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../api/User';
import { queryClient } from '../../api/queryClient';

export const RegistrationForm: FC = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerMutation = useMutation(
    {
      mutationFn: () => registerUser(name, email, password),
    },
    queryClient
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    registerMutation.mutate();
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <FormField label="Username">
        <input className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          value={name}
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

      <FormField label="Password">
        <input className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </FormField>

      {registerMutation.error && <span className='bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded'>{registerMutation.error.message}</span>}

      <Button
        type="submit"
        title="Sign Up"
        isLoading={registerMutation.isPending} />
    </form>
  );
};
